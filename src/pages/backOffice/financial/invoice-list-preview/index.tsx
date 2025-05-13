import { Button, Table, TableColumnProps, Text } from '@smartech/ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetcher } from '@/api/fetcher';
import { getPath } from '@/api/getPath';
import blackLogo from '@/assets/images/black-logo.png';
import { Card, Loading } from '@/components';
import Page from '@/layouts/container';
import { numberWithCommas } from '@/utils/numberWithComma';

export interface InvoiceResponse {
  status: string;
  result: InvoiceDetails;
}

export interface InvoiceDetails {
  crc: number;
  createdDate: string;
  modifiedDate: string;
  id: number;
  startDate: string;
  endDate: string;
  internalNumber: number;
  penalty: number;
  mauCount: number;
  status: string;
  perEventPrice: number;
  eventsCount: number;
  perMilEventsPrice: number;
  basePriceDetails: PriceDetails;
  eventsPriceDetails: PriceDetails;
  totalPrice: number;
  totalDiscount: number;
  totalDiscountedPrice: number;
  totalVat: number;
  finalPrice: number;
  contract: Contract;
}

export interface PriceDetails {
  price: number;
  discountPercent: number;
  vatPercent: number;
  discountedPrice: number;
  vat: number;
  discount: number;
  finalPrice: number;
}

export interface Contract {
  customer: string;
  nationalCode: string;
  economicCode: string;
  registrationCode: string;
  address: string;
  zipCode: string;
  phone: string;
  includeSystemEvents: boolean;
}

const TABLE_COLUMNS = {
  number: 'ردیف',
  productServices: 'شرح کالا/خدمات',
  quantity: 'تعداد',
  unit: 'واحد',
  unitPrice: 'قیمت واحد',
  totalPrice: 'قیمت کل',
  discountAmount: 'مبلغ تخفیف',
  totalDiscountedPrice: 'قیمت پس از تخفیف',
  taxCharges: 'مالیات و عوارض',
  totalPriceAfterTax: 'قیمت نهایی',
};

const TABLE_DATA = {
  intrack: 'سرویس اینتراک',
  events: 'رویدادها',
  month: 'ماه',
  eventNumber: 'عدد',
  total: 'جمع کل',
};

type TableData = {
  key: string;
  name: string;
  count: number;
  unit: string;
  unitAmount: string | number;
  totalAmount: string | number;
  discount: string | number;
  totalAmountAfterDiscount: string | number;
  taxes: string | number;
  totalAmountPlusTaxesFees: string | number;
};

function InvoicePreview() {
  const [invoice, setInvoice] = useState<InvoiceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { recordId } = useParams();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const formData = new FormData();
        formData.append('id', recordId || '');

        const { data } = await fetcher<InvoiceResponse>(
          getPath('/billing/invoice/view/:id', { id: recordId || '' }),
          {
            method: 'POST',
            body: formData,
          },
        );
        setInvoice(data.result || null);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      } finally {
        setLoading(false);
      }
    };

    if (recordId) fetchInvoice();
  }, [recordId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <Loading />;
  if (!invoice)
    return (
      <Page headerTitle="Invoice Preview">
        <Card className="w-full">
          <Text>Invoice not found</Text>
        </Card>
      </Page>
    );

  const columns: TableColumnProps<TableData>[] = [
    {
      title: TABLE_COLUMNS.number,
      dataIndex: 'key',
      align: 'center',
    },
    {
      title: TABLE_COLUMNS.productServices,
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: TABLE_COLUMNS.quantity,
      dataIndex: 'count',
      align: 'center',
    },
    {
      title: TABLE_COLUMNS.unit,
      dataIndex: 'unit',
      align: 'center',
    },
    {
      title: TABLE_COLUMNS.unitPrice,
      dataIndex: 'unitAmount',
      align: 'center',
    },
    {
      title: TABLE_COLUMNS.totalPrice,
      dataIndex: 'totalAmount',
      align: 'center',
    },
    {
      title: TABLE_COLUMNS.discountAmount,
      dataIndex: 'discount',
      align: 'center',
    },
    {
      title: TABLE_COLUMNS.totalDiscountedPrice,
      dataIndex: 'totalAmountAfterDiscount',
      align: 'center',
    },
    {
      title: TABLE_COLUMNS.taxCharges,
      dataIndex: 'taxes',
      align: 'center',
    },
    {
      title: TABLE_COLUMNS.totalPriceAfterTax,
      dataIndex: 'totalAmountPlusTaxesFees',
      align: 'center',
    },
  ];

  const data: TableData[] = [
    {
      key: '1',
      name: TABLE_DATA.intrack,
      count: 1,
      unit: TABLE_DATA.month,
      unitAmount: numberWithCommas(invoice?.basePriceDetails?.price),
      totalAmount: numberWithCommas(invoice?.basePriceDetails?.price),
      discount: numberWithCommas(invoice?.basePriceDetails?.discount),
      totalAmountAfterDiscount: numberWithCommas(invoice?.basePriceDetails?.discountedPrice),
      taxes: numberWithCommas(invoice?.basePriceDetails?.vat),
      totalAmountPlusTaxesFees: numberWithCommas(invoice?.basePriceDetails?.finalPrice),
    },
    {
      key: '2',
      name: TABLE_DATA.events,
      count: invoice.eventsCount,
      unit: TABLE_DATA.eventNumber,
      unitAmount: numberWithCommas(invoice.perEventPrice),
      totalAmount: numberWithCommas(invoice?.eventsPriceDetails?.price),
      discount: numberWithCommas(invoice?.eventsPriceDetails?.discount),
      totalAmountAfterDiscount: numberWithCommas(invoice?.eventsPriceDetails?.discountedPrice),
      taxes: numberWithCommas(invoice?.eventsPriceDetails?.vat),
      totalAmountPlusTaxesFees: numberWithCommas(invoice?.eventsPriceDetails?.finalPrice),
    },
    {
      key: '3',
      name: '',
      count: 0,
      unit: '',
      unitAmount: '',
      totalAmount: '',
      discount: '',
      totalAmountAfterDiscount: '',
      taxes: '',
      totalAmountPlusTaxesFees: '',
    },
    {
      key: '4',
      name: TABLE_DATA.total,
      count: 0,
      unit: '',
      unitAmount: '',
      totalAmount: numberWithCommas(invoice?.totalPrice),
      discount: numberWithCommas(invoice?.totalDiscount),
      totalAmountAfterDiscount: numberWithCommas(invoice?.totalDiscountedPrice),
      taxes: numberWithCommas(invoice.totalVat),
      totalAmountPlusTaxesFees: numberWithCommas(invoice.finalPrice),
    },
  ];

  return (
    <div
      className="Text-4 flex w-full flex-col gap-4 p-4 ltr:mr-0"
      style={{ direction: 'rtl', overflow: 'auto' }}
    >
      <div className="flex justify-between">
        <img src={blackLogo} alt="logo" />
        <Button size="sm" variant="primary" className="text-base px-6 py-2" onClick={handlePrint}>
          DOWNLOAD / PRINT
        </Button>
      </div>
      <Card className="flex w-full flex-col justify-between gap-4 border-none">
        <div className="flex flex-row justify-between gap-4 p-4 align-middle">
          <div className="flex flex-1 flex-row gap-4">
            <img className="h-12 w-32" src={blackLogo} alt="logo" />
          </div>
          <Text className="flex-1 text-center">پیش فاکتور فروش کالا و خدمات</Text>
          <div className="flex-1 text-center">
            <Text>شماره: {invoice.internalNumber}</Text>
            <Text>تاریخ: {invoice.createdDate}</Text>
          </div>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center justify-center gap-1 bg-gray-100 p-4">
            <Text className="h-fit w-fit rotate-90 justify-center">فروشنده</Text>
          </div>
          <div className="flex w-full flex-col gap-1">
            <div className="Text-3 flex flex-row justify-between gap-1 bg-gray-100 p-4 text-end">
              <div className="flex-2">
                <span>نام شخص حقیقی/حقوقی:</span>
                <span> شرکت اطلس ارتباط رامان </span>
              </div>
              <div className="flex-1">
                <span> شماره ثبت: </span>
                <span>521875 </span>
              </div>
              <div className="flex-1">
                <span>کد اقتصادی: </span>
                <span>14007365912</span>
              </div>
              <div className="flex-1">
                <span>شناسه ملی: </span>
                <span>14007365912</span>
              </div>
            </div>
            <div className="Text-3 flex flex-row justify-between gap-1 bg-gray-100 p-4 text-end">
              <div className="flex-2">
                <span>آدرس : </span>
                <span>شهرک قدس (غرب)، خیابان مهستان، کوچه یازدهم، پلاک ۱۵ ، طبقه ۱</span>
              </div>
              <div className="flex-1">
                <span> تلفن : </span>
                <span> 1465765461</span>
              </div>
              <div className="flex-1">
                <span>کد پستی : </span>
                <span> 1465765461</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center justify-center gap-1 bg-gray-100 p-4">
            <Text className="h-fit w-fit rotate-90 justify-center">خریدار</Text>
          </div>
          <div className="flex w-full flex-col gap-1">
            <div className="Text-3 flex flex-row justify-between gap-1 bg-gray-100 p-4 text-end">
              <div className="flex-2">
                <span>نام شخص حقیقی/حقوقی:</span>
                <span> {invoice.contract.customer} </span>
              </div>
              <div className="flex-1">
                <span> شماره ثبت: </span>
                <span>{invoice.contract.registrationCode} </span>
              </div>
              <div className="flex-1">
                <span>کد اقتصادی : </span>
                <span>{invoice.contract.economicCode} </span>
              </div>
              <div className="flex-1">
                <span>شناسه ملی: </span>
                <span>{invoice.contract.nationalCode} </span>
              </div>
            </div>
            <div className="Text-3 flex flex-row justify-between gap-1 bg-gray-100 p-4 text-end">
              <div className="flex-2">
                <span>آدرس : </span>
                <span>{invoice.contract.address} </span>
              </div>
              <div className="flex-1">
                <span> تلفن : </span>
                <span> {invoice.contract.phone} </span>
              </div>
              <div className="flex-1">
                <span>کد پستی : </span>
                <span> {invoice.contract.zipCode} </span>
              </div>
            </div>
          </div>
        </div>
        <Text className="m-8 text-center"> مشخصات کالا و خدمات</Text>
        <div>
          <Table layout="auto" columns={columns} data={data} rowKey={(row) => row.key} />
        </div>

        <div className="flex flex-row justify-between gap-1">
          <div className="Text-2 flex-1 justify-center bg-gray-100 p-4 align-middle">
            <Text>شرایط و نحوه فروش: نقدی یا غیر نقدی</Text>
          </div>
          <div className="flex flex-1 justify-between bg-gray-100 p-4">
            <Text>جمع کل به حروف</Text>
            <Text>{numberWithCommas(invoice?.finalPrice || 0)} ریال</Text>
          </div>
        </div>
        <div className="Text-2 bg-gray-100 p-4">
          <Text>توضیحات</Text>
        </div>
        <div className="flex flex-row justify-between gap-1">
          <div className="Text-2 flex-1 flex-row justify-between bg-gray-100 p-4">
            <Text>امضای فروشنده</Text>
          </div>
          <div className="Text-2 flex-1 flex-row justify-between bg-gray-100 p-4">
            <Text>امضای خریدار</Text>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default InvoicePreview;
