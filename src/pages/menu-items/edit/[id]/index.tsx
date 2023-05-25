import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getMenuItemsById, updateMenuItemsById } from 'apiSdk/menu-items';
import { Error } from 'components/error';
import { menuItemsValidationSchema } from 'validationSchema/menu-items';
import { MenuItemsInterface } from 'interfaces/menu-items';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { MenusInterface } from 'interfaces/menus';
import { getMenus } from 'apiSdk/menus';

function MenuItemsEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<MenuItemsInterface>(() => `/menu-items/${id}`, getMenuItemsById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: MenuItemsInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateMenuItemsById(id, values);
      mutate(updated);
      resetForm();
      router.push('/menu-items');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<MenuItemsInterface>({
    initialValues: data,
    validationSchema: menuItemsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Menu Items
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="description" mb="4" isInvalid={!!formik.errors.description}>
              <FormLabel>Description</FormLabel>
              <Input type="text" name="description" value={formik.values.description} onChange={formik.handleChange} />
              {formik.errors.description && <FormErrorMessage>{formik.errors.description}</FormErrorMessage>}
            </FormControl>
            <FormControl id="price" mb="4" isInvalid={!!formik.errors.price}>
              <FormLabel>Price</FormLabel>
              <NumberInput
                name="price"
                value={formik.values.price}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('price', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.price && <FormErrorMessage>{formik.errors.price}</FormErrorMessage>}
            </FormControl>
            <FormControl id="image_url" mb="4" isInvalid={!!formik.errors.image_url}>
              <FormLabel>Image URL</FormLabel>
              <Input type="text" name="image_url" value={formik.values.image_url} onChange={formik.handleChange} />
              {formik.errors.image_url && <FormErrorMessage>{formik.errors.image_url}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<MenusInterface>
              formik={formik}
              name={'menu_id'}
              label={'Menu'}
              placeholder={'Select Menus'}
              fetcher={getMenus}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default MenuItemsEditPage;
