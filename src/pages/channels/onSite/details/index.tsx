import { Steps } from '@smartech/ui';
import { Fragment, lazy } from 'react';

import { Card, Loading } from '@/components';
import { ChannelFooter } from '@/components/templates/channels';
import { CONSTANTS } from '@/constants';
import { useChannel } from '@/hooks';
import Page from '@/layouts/container';
import { Portal } from '@/utils';

const Audience = lazy(() => import('@/components/templates/channels/audience'));
const When = lazy(() => import('@/components/templates/channels/when'));
const Message = lazy(() => import('@/components/templates/channels/message'));
const Tracking = lazy(() => import('@/components/templates/channels/tracking'));
const TestCampaign = lazy(() => import('@/components/templates/channels/testCampaign'));
const Preview = lazy(() => import('@/components/templates/channels/preview'));

function Details() {
  const { stepIndex, back, next } = useChannel('ONSITE');

  return (
    <Fragment>
      <Page>
        <Card layout="fill">
          <Steps fallback={<Loading />} currentIndex={stepIndex}>
            <Steps.Item id="audience" title="Audience">
              <Audience />
            </Steps.Item>
            <Steps.Item id="when" title="When">
              <When />
            </Steps.Item>
            <Steps.Item id="message" title="Message">
              <Message />
            </Steps.Item>
            <Steps.Item id="tracking" title="Tracking">
              <Tracking />
            </Steps.Item>
            <Steps.Item id="testCampaign" title="Test Campaign">
              <TestCampaign />
            </Steps.Item>
            <Steps.Item id="preview" title="Preview & Launch">
              <Preview />
            </Steps.Item>
          </Steps>
        </Card>
      </Page>
      <Portal selector={`#${CONSTANTS.CHANNELS_FOOTER_ID}`}>
        <ChannelFooter index={stepIndex} back={back} next={next} />
      </Portal>
    </Fragment>
  );
}

export default Details;
