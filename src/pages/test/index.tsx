import { Button } from '@/components/ui/button';

const TestPage = () => {
  return (
    <div className="flex flex-col gap-8 p-10">
      <Button asChild>
        <a
          href="https://paneltest3.adtrace.io?utm_source=faezetest2&utm_medium=test2&utm_campaign=test3&utm_id=2&utm_term=web"
          rel="noopener noreferrer"
        >
          Go to
          https://paneltest3.adtrace.io?utm_source=faezetest2&utm_medium=test2&utm_campaign=test3&utm_id=2&utm_term=web
        </a>
      </Button>

      <Button asChild>
        <a
          href="https://paneltest3.adtrace.io?utm_source=faezetest3&utm_medium=test3&utm_campaign=test4&utm_id=3&utm_term=web+analytics"
          rel="noopener noreferrer"
        >
          Go to
          https://paneltest3.adtrace.io?utm_source=faezetest3&utm_medium=test3&utm_campaign=test4&utm_id=3&utm_term=web+analytics
        </a>
      </Button>
      <Button asChild>
        <a
          href="https://paneltest3.adtrace.io?utm_source=yektanet&utm_medium=banner&utm_campaign=yalda&utm_id=4&utm_term=webanalytics&utm_content=segment"
          rel="noopener noreferrer"
        >
          Go to
          https://paneltest3.adtrace.io?utm_source=yektanet&utm_medium=banner&utm_campaign=yalda&utm_id=4&utm_term=webanalytics&utm_content=segment
        </a>
      </Button>
      <Button asChild>
        <a
          href="https://paneltest3.adtrace.io?utm_source=tapsel&utm_medium=native&utm_campaign=yalda&utm_id=5&utm_term=webanalytics&utm_content=segment"
          rel="noopener noreferrer"
        >
          Go to
          https://paneltest3.adtrace.io?utm_source=tapsel&utm_medium=native&utm_campaign=yalda&utm_id=5&utm_term=webanalytics&utm_content=segment
        </a>
      </Button>
      <Button asChild>
        <a
          href="https://paneltest3.adtrace.io?utm_source=sms&utm_medium=social&utm_campaign=yalda&utm_id=6&utm_term=webanalytics&utm_content=segment"
          rel="noopener noreferrer"
        >
          Go to
          https://paneltest3.adtrace.io?utm_source=sms&utm_medium=social&utm_campaign=yalda&utm_id=6&utm_term=webanalytics&utm_content=segment
        </a>
      </Button>
    </div>
  );
};

export default TestPage;
