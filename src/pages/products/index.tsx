import { Button, GroupButton, Input, Modal, Table, Text, useNotify } from '@smartech/ui';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { CopyBlock, atomOneLight } from 'react-code-blocks';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

import { createFormHandler } from '@/common';
import { Card } from '@/components';
import Page from '@/layouts/container';
import {
  useAnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStats,
  useGoalsServiceGetApiV1GoalsSiteDomainByDomain,
  useSegmentsServiceGetApiV1Segments,
  useSitesServiceDeleteApiV1SitesDomainByDomain,
  useSitesServiceGetApiV1SitesUserByUserId,
  useSitesServicePostApiV1Sites,
} from '@/openapi/queries';
import { Goal, Segment } from '@/openapi/requests/types.gen';
import { loginRequestSchema } from '@/services/auth/schema';

interface Product {
  _domain: string;
}

function Products() {
  const [domain, setDomain] = useState('paneltest3.adtrace.io');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [domainForDelete, setDomainForDelete] = useState('');

  // Use the goals query
  const {
    data: userProducts,
    refetch,
    isLoading,
    error,
  } = useSitesServiceGetApiV1SitesUserByUserId({
    userId: Cookies.get('userUuid') || '',
  });

  const { mutate: deleteProduct, isPending: isDeleting } =
    useSitesServiceDeleteApiV1SitesDomainByDomain({});

  useEffect(() => {
    if (!isModalOpen) refetch();
  }, [isModalOpen]);

  const processedData: Product[] =
    userProducts?.map((product) => ({
      ...product,
      _domain: product?.domain,
    })) || [];

  // Use processed API data if available, otherwise use mock data

  const notify = useNotify();

  console.log(processedData, 'processedData');

  return (
    <Page>
      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <Modal
        open={!!domainForDelete}
        icon="trash-01"
        title={`Delete ${domainForDelete} Product?`}
        description="Are you sure you want to delete this product?"
        closable={true}
        onClose={() => setDomainForDelete('')}
        onConfirm={() => {
          console.log('delete');
          deleteProduct(
            {
              domain: domainForDelete,
            },
            {
              onSuccess: () => {
                refetch();
                notify.open({
                  title: 'Product deleted',
                  description: 'Product deleted successfully',
                  type: 'success',
                });
                setDomainForDelete('');
              },
            },
          );
        }}
      ></Modal>

      {/* <Card
        layout="stretch"
        title="Products"
        headerElements={
          <Button
            leading="icon"
            icons={{ start: 'plus' }}
            className="ml-auto"
            variant="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add new
          </Button>
        }
      > */}

      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1 pt-8">
          {!processedData.length ? (
            <>
              <Text size="md" variant="semibold">
                Begin your journey
              </Text>

              <Text size="xs" variant="regular" className="text-gray-600">
                Please, Add your Product (web)
              </Text>
            </>
          ) : (
            <Text size="md" variant="semibold">
              Product Management
            </Text>
          )}
        </div>

        <Button
          leading="icon"
          icons={{ start: 'plus' }}
          className="ml-auto"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add new
        </Button>
      </div>

      <div>
        <div className="mb-4">
          <GroupButton>
            <GroupButton.Item>12 months</GroupButton.Item>
            <GroupButton.Item>30 days</GroupButton.Item>
            <GroupButton.Item>7 days</GroupButton.Item>
            <GroupButton.Item>24 hours</GroupButton.Item>
          </GroupButton>
        </div>

        {isLoading ? (
          <div>Loading events...</div>
        ) : error ? (
          <div>Error loading events: {(error as Error).message}</div>
        ) : (
          <Table
            data={processedData}
            columns={
              [
                {
                  dataIndex: '_domain',
                  title: 'Website',
                  render: (item: Product) => item?._domain,
                },
                {
                  dataIndex: 'actions',
                  title: 'Action',
                  render: (item: Product) => (
                    <div className="flex gap-2">
                      <Button
                        icons={{ start: 'code-01' }}
                        variant="tertiary"
                        size="sm"
                        leading="icon"
                      />

                      <Button
                        icons={{ start: 'trash-01' }}
                        variant="tertiary"
                        size="sm"
                        leading="icon"
                        onClick={() => setDomainForDelete(item?._domain || '')}
                      />
                    </div>
                  ),
                },
              ] as any
            }
            layout="auto"
            rowKey={(row) => row._domain || ''}
            emptyText="There is no Product (web)"
            emptyDescription="Click ‘Add New” to begin"
            noHeader={false}
          />
        )}
      </div>
      {/* </Card> */}
    </Page>
  );
}

const AddProductModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // @ts-ignore
  const useCreateProductForm = createFormHandler<any>(
    { domain: '' },
    z.object({
      domain: z.string().nonempty({ message: 'Domain is required' }),
    }),
  );
  const notify = useNotify();

  const { handleSubmit, formState, control, reset } = useCreateProductForm();

  const { mutate: createProduct, isPending } = useSitesServicePostApiV1Sites({});

  // TODO fill this
  const scriptCode = `export const URL = {
    current: "currentURL",
    transparent: "transparent",
    white: "rgb(var(--colors-white) / <alpha-value>)",
    black: "rgb(var(--colors-black) / <alpha-value>)",
  }`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptCode);
  };

  if (!isOpen) return null;

  const onSubmit = (data: any) => {
    console.log(data, 'ssss');
    createProduct(
      {
        requestBody: { domain: data?.domain, user_id: Cookies.get('userUuid') || '' },
      },
      {
        onSuccess: () => {
          notify.open({
            title: 'Product added',
            description: 'Product added successfully',
            type: 'success',
          });

          onClose();
          reset();
        },
        onError: (error: any) => {
          notify.open({
            title: 'Error',
            description: error?.message || '',
            type: 'error',
          });
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0A0D12]/80">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-50 m-4 w-full max-w-[640px] rounded-lg bg-base-white p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <Text size="md" variant="semibold">
            Add Product
          </Text>
          <Button
            variant="tertiary"
            size="sm"
            icons={{ start: 'x-close' }}
            onClick={onClose}
            leading="icon"
          />
        </div>

        <Text size="sm" variant="regular" className="pb-5 text-gray-600">
          Enter your website address and then add the following script to your site{' '}
        </Text>

        <div className="mb-6">
          <Controller
            control={control}
            name="domain"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="Website Address"
                className="font-regular text-md text-gray-600"
                leading={
                  <span className="border-r border-gray-300 px-3 text-gray-600">https://www.</span>
                }
                placeholder="enter something like “adtrace.io”"
                required
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="block font-medium text-sm text-gray-700">Script</label>
            {/* <Button
              variant="tertiary"
              size="sm"
              icons={{ start: 'copy-01' }}
              onClick={copyToClipboard}
              leading="icon"
            /> */}
          </div>
          {/* <div className="font-mono overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100"> */}
          <CopyBlock
            text={scriptCode}
            language="javascript"
            showLineNumbers={false}
            wrapLongLines
            theme={atomOneLight}
            codeBlock
          />
          {/* </div> */}
        </div>

        <div className="flex justify-end">
          <Button variant="primary" className="px-20" spinning={isPending}>
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Products;
