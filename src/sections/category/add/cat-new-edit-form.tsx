import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// utils
// routes
import { useRouter } from 'src/routes/hook';
// types
// assets
// components
import { useCategoryCreate } from 'src/api/category';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { ICategoryTableFilterValue } from 'src/types/community';

type Props = {
  currentCategory?: ICategoryTableFilterValue;
};

interface FormValues extends ICategoryTableFilterValue {}

const CategoryAddForm: React.FC = ({ currentCategory }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const createCategory = useCategoryCreate();

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

  const { reset, handleSubmit, setValue, trigger } = methods;

  // const onSubmit = useCallback((data: IUserTableFilters) => mutate(data), [mutate]);
  const onSubmit = useCallback((data: ICategoryTableFilterValue) => {
    createCategory.mutate(data)
    reset()}
  , [createCategory.mutate]);


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Name" />


            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" color="success" loading={createCategory.isLoading}>
                Create Category
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(CategoryAddForm);
