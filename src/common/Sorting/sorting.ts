export const handleSortData = (data:any, sortDirection:any) =>{
    console.log('newwww',sortDirection)
    const newData = [...data];
    const reversData = newData.reverse();
    return reversData;
//     if (sortDirection === "asc") {
//         dtat = [reversData,"desc"]
//               console.log("desc", sortDirection);
//             } else {
//                 return [reversData,"asc"]
//             }
}


// (data:any,column:any, sortDirection:any) => {
//     // Make a copy of the data array
//     const newData = [...data];

// //   const reversData = data.reverse();
// //   console.log('newwww',newData)
//     // Sort the copy based on the column and sort direction
//     const sorted = newData.sort((a, b) => {
//       if (sortDirection === "asc") {
//         return a[column] - b[column];
//       } else {
//         return b[column] - a[column];
//       }
//     });
  
//     // console.log('dnewData', sorted)
//     // Update the data state variable with the sorted data
//     // setData(newData);
  
//     // // Toggle the sort direction for the next click
//     if (sortDirection === "asc") {
//       console.log("desc");
//     } else {
//       console.log("asc");
//     }
//   };