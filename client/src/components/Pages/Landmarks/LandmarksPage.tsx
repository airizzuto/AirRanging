// import React, { useEffect, useState } from 'react';
// import useDebounce from '../../../hooks/useDebounce';

// import landmarkService from '../../../services/landmarkService';

// import { LandmarkSearchOptions, LandmarksFilterSearch, LandmarkWithSocials } from '../../../types/Landmark/Landmark';
// import { PaginationInfo, PaginationOptions } from '../../../types/Pagination';
// import { UserPublic } from '../../../types/User/User';

// import { LinkButton } from '../../Generics/Buttons/Button';
// import LandmarksSearchbar from '../../Generics/Filters/LandmarksSearchbar';
// import PaginationControls from '../../Generics/Pagination/PaginationControls';

// import Style from "../../Generics/ListingPage.module.scss";

// interface Props {
//   user: UserPublic | null;
//   saved: LandmarkWithSocials[] | null;
//   handleSelection: (selected: LandmarkWithSocials | null) => void;
//   handleSave: (LandmarkId: string) => Promise<void>;
//   handleUnsave: (LandmarkId: string) => Promise<void>;
// }

// // TODO: generic page of models
// const LandmarksPage: React.FC<Props> = ({
//   user,
//   saved,
//   handleSave,
//   handleUnsave,
//   handleSelection,
// }) => {
//   const [landmarks, setLandmarks] = useState<LandmarkWithSocials[] | undefined>([]);

//   const [filters, setFilters] = useState<LandmarksFilterSearch>({
//     set: "all",
//     searchField: LandmarkSearchOptions.Name,
//     search: ""
//   });

//   const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
//     PageSize: 5,
//     CurrentPage: 1,
//   });
//   const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
//     TotalCount: 0,
//     TotalPages: 1,
//     HasNext: false,
//     HasPrevious: false,
//   });

//   const debouncedFilter = useDebounce(filters, 500);

//   useEffect(() => {
//     console.debug("EFFECT - filter: ", debouncedFilter);
//     landmarkService.searchLandmarksPaged(debouncedFilter, paginationOptions)
//       .then(response => {
//         if (response) {
//           setPaginationInfo(response.pagination);
//           setLandmarks(response.data);
//         }
//       }).catch(error => {
//         console.error(error);
//         setLandmarks([]);
//       });
  
//   },[debouncedFilter, paginationOptions]);

//   const handleLandmarksFilters = (filters: LandmarksFilterSearch) => {
//     setFilters({...filters});
//   };

//   const handlePagination = (pagination: PaginationOptions) => {
//     setPaginationOptions(pagination);
//   };


//   return (
//     <div className={Style.Container}>

//       <div className={Style.SubHeader}>
//         <h1 className={Style.Title}>Browse Landmarks</h1>

//         <div className={Style.Searchbar}>
//           <LandmarksSearchbar
//             filters={filters}
//             handleFilter={handleLandmarksFilters}
//             placeholder={"Search landmarks"}
//           />
//         </div>
        
//         <div className={Style.Dropdown}>
//           <DropdownLandmarksOptions 
//             placeholder={"Search By"} 
//             filters={filters}
//             handleFilter={handleLandmarksFilters}
//             enumerator={LandmarkSearchOptions}
//           />
//         </div>

//         <div className={Style.CreateNew}>
//           <LinkButton path="/landmarks/create" style={"primary"}>
//             Create Landmark
//           </LinkButton>
//         </div>
//       </div>

//       <div className={Style.Content}>
//         <div className={Style.Filters}>
//           {/* TODO: advanced filter */}
//           {/* <AdvancedFilter
//             user={user}
//             filters={filters}
//             handleFilters={handleFilters}
//           /> */}
//         </div>
//         {
//           !landmarks || landmarks.length === 0
//           ? <div className={Style.LandmarksLoading}>
//               <p>Loading landmarks...</p> {/* TODO: spinner */}
//             </div>
//           : <div className={Style.Cards}>
//               {landmarks.map((landmark) => {
//                 return <LandmarkCard
//                     key={landmark.id}
//                     user={user}
//                     landmark={landmark}
//                     saved={saved}
//                     handleSelection={handleSelection}
//                     handleSave={handleSave}
//                     handleUnsave={handleUnsave} 
//                 />;
//               })}
//             </div>
//         }
//       </div>

//       <div className={Style.Pagination}>
//         <PaginationControls 
//           paginationInfo={paginationInfo}
//           paginationOptions={paginationOptions}
//           handlePagination={handlePagination}
//         />
//       </div>
//     </div>
//   );
// };

// TODO: landmarks component
const LandmarksPage = () => {
  return (
    <div>LandmarksPage</div>
  );
};

export default LandmarksPage;
