// import React, { useState } from 'react';
// import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';

// import "./Pagination.scss";

// interface Props {
//   data: AircraftWithSocials[];
//   RenderComponent: React.ReactElement;
//   dataLimit: number;
//   pageLimit: number;
// }

// /* 
//   Pagination component based on: academind.com
//   Ref: https://academind.com/tutorials/reactjs-pagination 
// */
// const Pagination: React.FC<Props> = ({data, RenderComponent, dataLimit=10, pageLimit=5}) => {
//   // TODO: metadata to state
//   const [pages] = useState(Math.round(data.length / dataLimit));
//   const [currentPage, setCurrentPage] = useState(1);

//   const goToNextPage = () => {
//     setCurrentPage((page) => page + 1);
//   };

//   const goToPreviousPage = () => {
//     setCurrentPage((page) => page - 1);
//   };

//   const changePage = (event) => {
//     const pageNumber = Number(event.target.value);
//     setCurrentPage(pageNumber);
//   };

//   const getPaginatedData = () => {
//     const startIndex = currentPage * dataLimit - dataLimit;
//     const endIndex = startIndex + dataLimit;
//     return data.slice(startIndex, endIndex);
//   };

//   const getPaginationGroup = () => {
//     const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
//     return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
//   };

//   return (
//     <div>
//       {/* show the posts, 10 posts at a time */}
//       <div className="dataContainer">
//         {getPaginatedData().map((d, idx) => (
//           <RenderComponent key={idx} data={d} />
//         ))}
//       </div>

//       {/* show the pagination
//           it consists of next and previous buttons
//           along with page numbers, in our case, 5 page
//           numbers at a time
//       */}
//       <div className="pagination">
//         {/* previous button */}
//         <button
//           onClick={goToPreviousPage}
//           className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
//         >
//           prev
//         </button>

//         {/* show page numbers */}
//         {getPaginationGroup().map((item, index) => (
//           <button
//             key={index}
//             onClick={changePage}
//             className={`paginationItem ${currentPage === item ? 'active' : null}`}
//           >
//             <span>{item}</span>
//           </button>
//         ))}

//         {/* next button */}
//         <button
//           onClick={goToNextPage}
//           className={`next ${currentPage === pages ? 'disabled' : ''}`}
//         >
//           next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
export {};
