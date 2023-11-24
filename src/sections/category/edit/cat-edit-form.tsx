'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// utils
// routes
// types
// assets
// components
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { paths } from '@routes/paths';
import { useParams } from 'next/navigation';
import { useCategory, useEditCategory } from 'src/api/category';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { ICategoryTableFilterValue } from 'src/types/community';

type Props = {
  currentCategory?: ICategoryTableFilterValue;
};

interface FormValues extends ICategoryTableFilterValue {}

const CategoryEditForm: React.FC = ({ currentCategory }: Props) => {
  const { id } = useParams();
  const category = useCategory();
  const editCategory = useEditCategory(id);
  const settings = useSettingsContext();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });
  const defaultValues = useMemo<FormValues>(
    () => ({
      name: currentCategory?.name || '',
    }),
    [currentCategory]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue } = methods;

  useEffect(() => {
    if (category) {
      const cat = category?.categories?.find((i: any) => i.id === parseInt(id, 10));
      setValue('name', cat?.name);
    }
  }, [category, id, setValue]);

  const onSubmit = useCallback(
    (data: ICategoryTableFilterValue) => {
      editCategory.mutate(data);
      reset();
    },
    [editCategory, reset]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Category: Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Categories', href: paths.dashboard.general.category.list },
          { name: 'Edit' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Card sx={{ p: 3, m: 3 }}>
              <RHFTextField
                name="name"
                label="Category"
                sx={{ display: 'flex', justifyContent: 'center' }}
              />

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="outlined"
                  color="success"
                  loading={editCategory.isLoading}
                >
                  Edit
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
};

export default memo(CategoryEditForm);
