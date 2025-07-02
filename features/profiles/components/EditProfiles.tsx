import FormField from '@/components/formField/FormField';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useUser } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { editProfileSchema, EditProfileSchemaType } from '@/validator/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface EditProfilesParams {
  titleTriger: string;
  titleTrigerClassName?: string;
  dialogTriggerClassName?: string;
  titleHeader: string;
  textButton: string;
  textDialogDescription?: string;
  classNameButton?: string;
  iconButton?: React.ReactNode;
}

const EditProfiles = ({ textButton, titleTriger, titleTrigerClassName, titleHeader, textDialogDescription, classNameButton, iconButton, dialogTriggerClassName }: EditProfilesParams) => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const user = useUser();
  const router = useRouter();
  //   console.log('userrrrr?:', user);

  const form = useForm<EditProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
  });

  const imagePreview = form.watch('avatar_url');

  // Auto-preview when file changes
  useEffect(() => {
    let url: string | null = null;

    const file = imagePreview;
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [imagePreview]);

  const onSubmit = async (data: EditProfileSchemaType) => {
    const supabase = createClient();
    console.log('data?', data);

    const file = data.avatar_url; // akses file
    console.log('File:', file);

    // jika wajib
    // if (!user?.id || !file || !(file instanceof File)) {
    //   console.error('Missing user or file');
    //   return;
    // }

    // jika optional
    if (!user?.id) {
      console.error('Missing user or file');
      return;
    }

    try {
      // Kalau ada file, upload ke storage
      let publicUrl: string | null = null;

      if (file && file instanceof File) {
        const extension = file.name.split('.').pop();
        const filePath = `avatar/${user.id}-${Date.now()}.${extension}`;

        // Upload ke storage
        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

        if (uploadError) {
          console.error('Upload error:', uploadError.message);
          return;
        }

        //Dapatkan public URL
        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        publicUrl = data.publicUrl;
      }

      // Update tabel `profiles`
      const updateData: Record<string, any> = {
        full_name: data.full_name,
      };

      if (publicUrl) {
        updateData.avatar_url = publicUrl;
      }

      const { error: updateError } = await supabase.from('profiles').update(updateData).eq('id', user.id);

      if (updateError) {
        console.error('Update profile error:', updateError.message);
        return;
      }
    } catch (error) {
      console.error('Unhandled error:', error);
    }

    setPreview(null);
    form.reset();
    setOpen(false);
    router.refresh();
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className={dialogTriggerClassName}>
          {iconButton}
          <span className={titleTrigerClassName}>{titleTriger}</span>
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <DialogHeader className="space-y-6">
            <DialogTitle>{titleHeader}</DialogTitle>
            <DialogDescription>{textDialogDescription}</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField control={form.control} name="full_name" label="Fullname" />
              <FormField
                control={form.control}
                name="avatar_url"
                label="Image"
                type="file"
                onChangeCustom={(e) => {
                  if (typeof e === 'object' && 'target' in e) {
                    const file = (e as React.ChangeEvent<HTMLInputElement>).target.files?.[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }
                }}
              />

              {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded" />}

              <DialogFooter>
                <Button type="button" className="bg-white text-black border hover:bg-gray-100/80" onClick={() => setOpen(false)}>
                  Cancel
                </Button>

                <Button type="submit" className={classNameButton} disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? <Loader /> : <span>{textButton}</span>}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfiles;
