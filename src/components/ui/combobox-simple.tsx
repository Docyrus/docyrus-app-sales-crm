import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { EnumOptionDisplay } from '@/components/docyrus/form-fields/lib/enum-option-display'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export interface ComboboxOption {
  label: string
  value: string
  color?: string | null
  icon?: string | null
}

interface ComboboxProps {
  options: Array<ComboboxOption>
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  contentClassName?: string
  disabled?: boolean
  disabledValues?: Array<string>
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Select option...',
  searchPlaceholder,
  emptyText = 'No option found.',
  className,
  contentClassName,
  disabled,
  disabledValues = [],
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const disabledValueSet = React.useMemo(
    () => new Set(disabledValues),
    [disabledValues],
  )

  const selectedOption = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between font-normal', className)}
          disabled={disabled}
        >
          {selectedOption ? (
            <EnumOptionDisplay
              option={{
                id: selectedOption.value,
                name: selectedOption.label,
                color: selectedOption.color ?? undefined,
                icon: selectedOption.icon ?? undefined,
              }}
              variant={
                selectedOption.color || selectedOption.icon ? 'chip' : 'inline'
              }
              className="min-w-0 max-w-full"
            />
          ) : (
            <span className="min-w-0 truncate text-muted-foreground">
              {placeholder}
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'w-(--radix-popover-trigger-width) min-w-[16rem] max-h-[min(22rem,var(--radix-popover-content-available-height))] overflow-hidden p-0',
          contentClassName,
        )}
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={
              searchPlaceholder || `Search ${placeholder.toLowerCase()}...`
            }
          />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isOptionDisabled = disabledValueSet.has(option.value)

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    keywords={[option.label]}
                    disabled={isOptionDisabled}
                    onSelect={(currentValue) => {
                      if (isOptionDisabled) return
                      onValueChange?.(
                        currentValue === value ? '' : currentValue,
                      )
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <EnumOptionDisplay
                      option={{
                        id: option.value,
                        name: option.label,
                        color: option.color ?? undefined,
                        icon: option.icon ?? undefined,
                      }}
                      variant={option.color || option.icon ? 'chip' : 'inline'}
                      className="min-w-0 max-w-full"
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
