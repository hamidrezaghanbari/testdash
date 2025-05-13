import { Table, TableColumnProps } from '@smartech/ui';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { fetcher } from '@/api/fetcher';

const defaultStyles = {
  fontSize: 11,
  fontWeight: '600',
  padding: '5px 10px',
  textTransform: 'uppercase',
  borderRadius: '50px',
};

export const PAYMENT_STATUS = {
  CREATED: {
    color: '#94969e',
    bgColor: '#e7e8e9',
  },
  ISSUED: {
    color: '#FFFFFF',
    bgColor: '#3a91eb',
  },
  PAYMENT_PENDING: {
    color: '#FFFFFF',
    bgColor: '#EF8F00',
  },
  PAYMENT_FAILED: {
    color: '#FFFFFF',
    bgColor: '#f76464',
  },
  PAID: {
    color: '#FFFFFF',
    bgColor: '#09d88c',
  },
};

export const CONTRACT_STATUS = {
  ENDED: {
    color: '#FFFFFF',
    bgColor: '#f76464',
  },
  PENDING: {
    color: '#FFFFFF',
    bgColor: '#EF8F00',
  },
  ACTIVE: {
    color: '#FFFFFF',
    bgColor: '#3BC12F',
  },
  ENDING: {
    color: '#FFFFFF',
    bgColor: '#ffc107',
  },
  NO_CONTRACT: {
    color: '#94969e',
    bgColor: '#e7e8e9',
  },
};

interface Contract {
  id: number;
  status: string;
  product: {
    id: number;
    name: string;
  };
  contractTemplate: {
    id: number;
    title: string;
  };
}

interface ContractData {
  id?: number;
  crc?: number;
  status?: string;
  finalPrice: number;
  internalNumber?: number;
  contract: Contract;
}

interface ApiResponse {
  result: {
    content: ContractData[];
    totalElements: number;
    size: number;
    number: number;
  };
  status: string;
}



const ProjectContracts = () => {
  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ['contracts'],
    queryFn: async () => {
      const { data } = await fetcher<ApiResponse>('/admin/billing/invoice/listAll', {
        method: 'POST',
        body: JSON.stringify({
          pageRequest: {
            direction: 'DESC',
            enabled: true,
            order: 'modifiedDate',
            name: null,
            page: 0,
          },
        }),
      });
      return data;
    },
  });

  const columns = useMemo(
    () =>
      [
        {
          title: 'Project Name',
          dataIndex: 'contract',
          render: (record: ContractData) => (
            <NavLink
              to={`/backoffice/financial/invoice-list/${record.contract?.id}`}
              className="cursor-pointer text-primary-600"
            >
              {record.contract?.product?.name}
            </NavLink>
          ),
        },
        {
          title: 'Contract Template',
          dataIndex: 'contract',
          render: (record: ContractData) => record.contract?.contractTemplate?.title || '-',
        },
        {
          title: 'Contract Status',
          dataIndex: 'contract',
          render: (record: ContractData) =>
            record.contract?.status ? (
              <span
                className="Status"
                style={{
                  ...defaultStyles,
                  backgroundColor:
                    CONTRACT_STATUS[record.contract.status as keyof typeof CONTRACT_STATUS]
                      ?.bgColor || '#e7e8e9',
                  color:
                    CONTRACT_STATUS[record.contract.status as keyof typeof CONTRACT_STATUS]
                      ?.color || '#94969e',
                  textTransform: 'uppercase' as const,
                }}
              >
                {record.contract.status}
              </span>
            ) : (
              '-'
            ),
        },
        {
          title: 'Last Payment Status',
          dataIndex: 'status',
          render: (record: ContractData) =>
            record.status ? (
              <span
                className="Status"
                style={{
                  ...defaultStyles,
                  backgroundColor:
                    PAYMENT_STATUS[record.status as keyof typeof PAYMENT_STATUS]?.bgColor ||
                    '#e7e8e9',
                  color:
                    PAYMENT_STATUS[record.status as keyof typeof PAYMENT_STATUS]?.color ||
                    '#94969e',
                  textTransform: 'uppercase' as const,
                }}
              >
                {record.status}
              </span>
            ) : (
              '-'
            ),
        },
      ] as TableColumnProps<ContractData>[],
    [],
  );

  return (
    <Table
      data={data?.result?.content ?? []}
      columns={columns}
      rowKey={(record) => record.contract?.id?.toString() ?? ''}
      loading={isLoading}
    />
  );
};

export default ProjectContracts;
