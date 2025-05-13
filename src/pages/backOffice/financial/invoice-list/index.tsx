import { IconButton, Table, TableColumnProps } from '@smartech/ui';
import { useEffect, useState } from 'react';
import { generatePath, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { fetcher } from '@/api/fetcher';
import { getPath } from '@/api/getPath';
import { Card, Loading } from '@/components';
import Page from '@/layouts/container';

const defaultStyles = {
  fontSize: 11,
  fontWeight: '600',
  padding: '5px 10px',
  textTransform: 'uppercase',
  borderRadius: '50px',
};

interface Invoice {
  id: number;
  endDate: string;
  internalNumber: number;
  basePrice: number;
  finalPrice: number;
  status: string;
}

interface InvoiceResponse {
  result: {
    content: Invoice[];
    totalElements: number;
    size: number;
    number: number;
  };
  status: string;
}

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

function InvoiceList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const columns: TableColumnProps<Invoice>[] = [
    {
      title: 'End Date',
      dataIndex: 'endDate',
      render: (record: Invoice) => <span>{record.endDate}</span>,
    },
    {
      title: 'Invoice Number',
      dataIndex: 'internalNumber',
      render: (record: Invoice) => <span>{record.internalNumber}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (record: Invoice) =>
        record.status ? (
          <span
            className="Status"
            style={{
              ...defaultStyles,
              backgroundColor:
                PAYMENT_STATUS[record.status as keyof typeof PAYMENT_STATUS]?.bgColor || '#e7e8e9',
              color:
                PAYMENT_STATUS[record.status as keyof typeof PAYMENT_STATUS]?.color || '#94969e',
              textTransform: 'uppercase' as const,
            }}
          >
            {record.status}
          </span>
        ) : (
          '-'
        ),
    },
    {
      title: 'Subscription Fee',
      dataIndex: 'basePrice',
      render: (record: Invoice) => <span>{record.basePrice}</span>,
    },
    {
      title: 'Final Price',
      dataIndex: 'finalPrice',
      render: (record: Invoice) => <span>{record.finalPrice}</span>,
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (record: Invoice) => (
        <IconButton
          icon="eye"
          variant="secondary"
          size="md"
          style={{ cursor: 'pointer', fontSize: '18px' }}
          onClick={() => {
            if (!id) return;
            // window.open(
            //   generatePath('/backOffice/financial/invoice-list/:id/invoice-preview/:recordId', {
            //     id,
            //     recordId: record.id.toString(),
            //   }),
            //   '_blank'
            // );

            navigate(
              generatePath('/backOffice/financial/invoice-list/:id/invoice-preview/:recordId', {
                id,
                recordId: record.id.toString(),
              }),
            );
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { data } = await fetcher<InvoiceResponse>(
          getPath('/admin/billing/invoice/list/:id', { id: id || '' }),
          {
            method: 'POST',
            body: JSON.stringify({
              direction: 'DESC',
              enabled: true,
              order: 'modifiedDate',
              name: null,
              page: 0,
              statuses: ['CREATED', 'ISSUED', 'PAYMENT_PENDING', 'PAYMENT_FAILED', 'PAID'],
            }),
          },
        );

        setInvoices(data.result?.content || []);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInvoices();
    }
  }, [id]);

  const onTabChange = (tab: string) => {
    const params = new URLSearchParams();
    params.set('tab', tab);
    setSearchParams(params, { replace: true, viewTransition: true });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Page headerTitle="Financial-list">
      <Card layout="fill">
        <Table
          data={invoices}
          columns={columns}
          rowKey={(record) => record.id.toString()}
          loading={loading}
        />
      </Card>
    </Page>
  );
}

export default InvoiceList;
