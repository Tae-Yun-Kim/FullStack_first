// import { useEffect, useState } from 'react';
// import { getCommunityList, increaseViewCount } from '../../api/communityApi';
// import useCustomMove from '../../hooks/useCustomMove';
// import FetchingModal from '../common/FetchingModal';
// import PageComponent from '../common/PageComponent';
// import { useNavigate } from 'react-router-dom';

// const initState = {
//   dtoList: [],
//   pageNumList: [],
//   pageRequestDTO: null,
//   prev: false,
//   next: false,
//   totalCount: 0,
//   prevPage: 0,
//   nextPage: 0,
//   totalPage: 0,
//   current: 0,
// };

// const ListComponent_c = () => {
//   const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
//   const [serverData, setServerData] = useState(initState);
//   const [fetching, setFetching] = useState(false);
//   const navigate = useNavigate();

//   const handleCommunityClick = async (community) => {
//     try {
//       await increaseViewCount(community.tno);
//       setServerData(prev => ({
//         ...prev,
//         dtoList: prev.dtoList.map(item => 
//           item.tno === community.tno 
//             ? {...item, viewCount: item.viewCount + 1}
//             : item
//         )
//       }));
//       moveToRead(community.tno); // 페이지, 사이즈 파라미터 제거
//     } catch (error) {
//       console.error('조회수 증가 실패:', error);
//       moveToRead(community.tno);
//     }
//   };
  
//   useEffect(() => {
//     setFetching(true);
//     getCommunityList({ page, size })
//       .then((data) => {
//         setServerData(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching community list:', error);
//       })
//       .finally(() => {
//         setFetching(false);
//       });
//   }, [page, size, refresh]);
//   return (
//     <div className="border-2 mt-10 mx-2 p-4">
//       {fetching && <FetchingModal />}
//       <div className="flex flex-wrap justify-center">
//         {serverData.dtoList.length > 0 ? (
//           serverData.dtoList.map((community) => (
//             <div
//               key={community.tno}
//               className="w-full md:w-1/2 lg:w-1/3 p-2 cursor-pointer"
//               onClick={() => handleCommunityClick(community)}
//             >
//               <div className="rounded shadow-md border-2 p-4 bg-white hover:shadow-lg transition-shadow">
//                 {community.uploadFileNames && community.uploadFileNames.length > 0 && (
//                   <div className="mb-4 h-48 overflow-hidden">
//                     <img
//                       src={`http://localhost:8080/api/community/view/${community.uploadFileNames[0]}`}
//                       alt="thumbnail"
//                       className="w-full h-full object-cover rounded"
//                     />
//                   </div>
//                 )}
//                 <h3 className="font-extrabold text-xl mb-2">{community.communityTitle}</h3>
//                 <p className="text-sm text-gray-500">작성자: {community.nickname}</p>
//                 <div className="flex justify-between mt-2">
//                   <div className="flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                       <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-sm text-gray-500">{community.viewCount}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-sm text-gray-500">{community.likeCount}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="w-full text-center p-4 text-gray-500">
//             게시글이 없습니다.
//           </div>
//         )}
//       </div>
//       <PageComponent serverData={serverData} movePage={moveToList} />
//     </div>
//   );
// };

// export default ListComponent_c;


import { useEffect, useState } from 'react';
import { getCommunityList, increaseViewCount } from '../../api/communityApi';
import useCustomMove from '../../hooks/useCustomMove';
import FetchingModal from '../common/FetchingModal';
import PageComponent from '../common/PageComponent';
import { useNavigate } from 'react-router-dom';

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent_c = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const handleCommunityClick = async (community) => {
    try {
      await increaseViewCount(community.tno);
      setServerData(prev => ({
        ...prev,
        dtoList: prev.dtoList.map(item => 
          item.tno === community.tno 
            ? {...item, viewCount: item.viewCount + 1}
            : item
        )
      }));
      moveToRead(community.tno); // 페이지, 사이즈 파라미터 제거
    } catch (error) {
      console.error('조회수 증가 실패:', error);
      moveToRead(community.tno);
    }
  };
  
  useEffect(() => {
    setFetching(true);
    getCommunityList({ page, size })
      .then((data) => {
        setServerData(data);
      })
      .catch((error) => {
        console.error('Error fetching community list:', error);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [page, size, refresh]);
  return (
    <div className="border-2 mt-10 mx-2 p-4">
      {fetching && <FetchingModal />}
      <div className="flex flex-wrap justify-center">
        {serverData.dtoList.length > 0 ? (
          serverData.dtoList.map((community) => (
            <div
              key={community.tno}
              className="w-full md:w-1/2 lg:w-1/3 p-2 cursor-pointer"
              onClick={() => handleCommunityClick(community)}
            >
              <div className="rounded shadow-md border-2 p-4 bg-white hover:shadow-lg transition-shadow">
                {community.uploadFileNames && community.uploadFileNames.length > 0 && (
                  <div className="mb-4 h-48 overflow-hidden">
                    <img
                      src={`http://localhost:8080/api/community/view/${community.uploadFileNames[0]}`}
                      alt="thumbnail"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
                <h3 className="font-extrabold text-xl mb-2">{community.communityTitle}</h3>
                <p className="text-sm text-gray-500">작성자: {community.nickname}</p>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-500">{community.viewCount}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-500">{community.likeCount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center p-4 text-gray-500">
            게시글이 없습니다.
          </div>
        )}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default ListComponent_c;
