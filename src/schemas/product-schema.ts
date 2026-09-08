import { z } from 'zod'

export const productFormSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  product_code: z.string().min(1, 'Product code is required'),
  Unit: z.string().optional(),
  unit_price: z.number().min(0, 'Unit price must be positive').optional(),
  __unit_price_currency: z.enum(['TRY', 'USD', 'EUR']).default('TRY'),
  category: z.string().optional(),
  tax: z
    .number()
    .min(0, 'Tax must be between 0 and 100')
    .max(100, 'Tax must be between 0 and 100')
    .optional()
})

export type ProductFormData = z.infer<typeof productFormSchema>
