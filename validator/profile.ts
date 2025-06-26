import { z } from 'zod';

export const editProfileSchema = z.object({
  full_name: z.string().min(5).max(15),
  // avatar_url: z
  //   .custom<File>()
  //   .refine((file) => file instanceof File, 'Plese enter picture')
  //   .refine((file) => ['image/jpeg', 'image/png'].includes(file?.type), 'Support File type : jpg or png')
  //   .optional(),

  avatar_url: z.union([z.instanceof(File), z.undefined()]).refine(
    (file) => {
      if (!file) return true;
      return ['image/jpeg', 'image/png'].includes(file.type);
    },
    { message: 'Support File type : jpg or png' }
  ),
});

export type EditProfileSchemaType = z.infer<typeof editProfileSchema>;
