import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be 3 characters"),
  slug: z.string().min(3, "Slug must be 3 characters"),
  category: z.string().min(3, "Category must be 3 characters"),
  brand: z.string().min(3, "Brand must be 3 characters"),
  description: z.string().min(3, "Description must be 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: z
    .string()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
      "Price must have exactly 2 decimal places"
    ),
});

export const signInFormSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(3, "Email must be at least 3 characters"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().min(3, "Email must be at least 3 characters"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z
      .string()
      .min(3, "Confirm password must be at least 3 character"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["ConfirmPassword"],
  });
