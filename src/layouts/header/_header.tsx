// import { Popover } from '@smartech/ui';
// import { memo, useState } from 'react';
// import { useCurrentProduct, useCurrentUser, useDocumentTitle } from '@/hooks';
// import { Render } from '@/utils';
// import classes from './header.module.scss';
// import { HeaderProductContent, HeaderProductTitle } from './productOverlay';
// import { HeaderUserContent, HeaderUserTitle } from './userOverlay';
// const Header = () => {
//   useDocumentTitle();
//   const [isOpenProductPopover, setIsOpenProductPopover] = useState(false);
//   const [isOpenUserPopover, setIsOpenUserPopover] = useState(false);
//   const { presentation, products } = useCurrentUser();
//   const product = useCurrentProduct();
//   return (
//     <header className={classes.mainHeader}>
//       <Render when={product}>
//         {({ name }) => (
//           <Popover
//             open={isOpenProductPopover}
//             onOpenChange={setIsOpenProductPopover}
//             title={(open) => <HeaderProductTitle name={name} open={open} />}
//           >
//             <HeaderProductContent
//               products={products}
//               onClose={() => setIsOpenProductPopover(false)}
//             />
//           </Popover>
//         )}
//       </Render>
//       <Popover
//         open={isOpenUserPopover}
//         onOpenChange={setIsOpenUserPopover}
//         title={(open) => <HeaderUserTitle presentation={presentation} open={open} />}
//       >
//         <HeaderUserContent onClose={() => setIsOpenUserPopover(false)} />
//       </Popover>
//     </header>
//   );
// };
// const MemoizedHeader = memo(Header);
// export { MemoizedHeader as Header };
