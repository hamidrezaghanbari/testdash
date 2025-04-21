import classes from './overview.module.scss';

const num = 295684;

const UsersOverview = () => {
  return (
    <div className="flex gap-4 py-2">
      <div className={classes.userSummaryCard}>
        <span className="font-inter-semibold text-4xl">{num.toLocaleString()}</span>
        <span className="text-gray-500">Total Users</span>
      </div>
      <div className={classes.userSummaryCard}>
        <span className="font-inter-semibold text-4xl">{num.toLocaleString()}</span>
        <span className="text-gray-500">Known Users</span>
      </div>
      <div className={classes.userSummaryCard}>
        <span className="font-inter-semibold text-4xl">5</span>
        <span className="text-gray-500">Monthly Active Users</span>
      </div>
    </div>
  );
};

export default UsersOverview;
