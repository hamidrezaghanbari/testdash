import { Button, GroupButton, Input, Modal, Table, Text, useNotify } from '@smartech/ui';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { CodeBlock, CopyBlock, atomOneLight } from 'react-code-blocks';
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
import { useDomainStore } from '@/store';

const getScriptCode = (domain: string) => {
  return `<script defer data-domain="${domain}" src="https://loadtest.adtrace.ir/web_script_cdn.js"></script>`;
};

interface Product {
  _domain: string;
}

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { domain, setDomain } = useDomainStore();

  const [domainForDelete, setDomainForDelete] = useState('');
  const [domainForCopy, setDomainForCopy] = useState('');

  // Use the goals query
  const {
    data: userProducts,
    refetch,
    isLoading,
    error,
  } = useSitesServiceGetApiV1SitesUserByUserId({
    userId: Cookies.get('userUuid') || '',
  });

  useEffect(() => {
    if (!isModalOpen) refetch();
  }, [isModalOpen]);

  const processedData: Product[] =
    userProducts?.map((product) => ({
      ...product,
      _domain: product?.domain,
    })) || [];

  useEffect(() => {
    if (userProducts?.length !== 0 && !domain) {
      setDomain(userProducts?.[0]?.domain || '');
    }
  }, [userProducts, domain]);

  return (
    <Page>
      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <DeleteProductModal
        domain={domainForDelete}
        isOpen={!!domainForDelete}
        onClose={() => setDomainForDelete('')}
        refetch={() => {
          if (domainForDelete === domain) {
            if (userProducts?.length === 1) {
              setDomain('');
            } else {
              setDomain(userProducts?.[0]?.domain || '');
            }
          }

          refetch();
        }}
      />

      <CopyScriptModal
        domain={domainForCopy}
        isOpen={!!domainForCopy}
        onClose={() => setDomainForCopy('')}
      />

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
                        onClick={() => setDomainForCopy(item?._domain || '')}
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
  const { domain, setDomain } = useDomainStore();

  const { handleSubmit, formState, control, reset, watch } = useCreateProductForm();

  const { mutate: createProduct, isPending } = useSitesServicePostApiV1Sites({});

  // TODO fill this
  const scriptCode = getScriptCode(watch('domain'));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptCode);
  };

  if (!isOpen) return null;

  const onSubmit = (data: any) => {
    createProduct(
      {
        requestBody: { domain: data?.domain, user_id: Cookies.get('userUuid') || '' },
      },
      {
        onSuccess: () => {
          if (!domain) {
            setDomain(data?.domain);
          }

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

const DeleteProductModal = ({
  domain,
  isOpen,
  onClose,
  refetch,
}: {
  domain: string;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}) => {
  const { mutate: deleteProduct, isPending: isDeleting } =
    useSitesServiceDeleteApiV1SitesDomainByDomain({});

  const notify = useNotify();

  const handleDelete = () => {
    deleteProduct(
      {
        domain: domain,
      },
      {
        onSuccess: () => {
          refetch();
          notify.open({
            title: 'Product deleted',
            description: 'Product deleted successfully',
            type: 'success',
          });
          onClose();
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0A0D12]/80">
      <div className="relative z-50 m-4 w-full max-w-120 rounded-lg bg-base-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <Text size="md" variant="semibold">
            Delete Product
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
          Are you sure you want to delete this{' '}
          <span className="px-1 font-semibold text-md text-gray-900">{domain}</span>
          product?
        </Text>

        <div className="flex justify-end">
          <Button variant="primary" onClick={handleDelete}>
            Delete Product
          </Button>
        </div>
      </div>
    </div>
  );
};

const CopyScriptModal = ({
  isOpen,
  onClose,
  domain,
}: {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
}) => {
  if (!isOpen) return null;

  const scriptCode = getScriptCode(domain);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0A0D12]/80">
      <div className="relative z-50 m-4 w-full max-w-120 rounded-lg bg-base-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <Text size="md" variant="semibold">
            Copy Code
          </Text>

          <Button
            variant="tertiary"
            size="sm"
            icons={{ start: 'x-close' }}
            onClick={onClose}
            leading="icon"
          />
        </div>

        <Text size="sm" variant="regular" className="pt-2">
          Snippet Code of <b className="px-1">{domain} </b> Product
        </Text>

        <div className="mt-4">
          <CopyBlock
            text={scriptCode}
            language="javascript"
            showLineNumbers={false}
            wrapLongLines
            theme={atomOneLight}
            codeBlock
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
