// import React from 'react'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// function RidePage() {
//     return (
//         <div>
//             <CardHeader>
//                 <CardTitle className="text-lg font-semibold text-gray-900">Ride Details</CardTitle>
//                 <CardDescription className="text-sm text-gray-600">
//                     Driver Name: {ride.driver.fullName}
//                 </CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <div className="mt-2">
//                     <div className="flex items-center">
//                         <span className="font-semibold text-gray-700">Origin: </span>
//                         <span className="ml-2 text-gray-600">{ride.origin}</span>
//                     </div>
//                     <div className="flex items-center mt-2">
//                         <span className="font-semibold text-gray-700">Destination: </span>
//                         <span className="ml-2 text-gray-600">{ride.destination}</span>
//                     </div>
//                     <div className="flex items-center mt-2">
//                         <span className="font-semibold text-gray-700">Departure Time: </span>
//                         <span className="ml-2 text-gray-600">{new Date(ride.departure_time).toLocaleString()}</span>
//                     </div>
//                     <div className="flex items-center mt-2">
//                         <span className="font-semibold text-gray-700">Available Seats: </span>
//                         <span className="ml-2 text-gray-600">{ride.available_seats}</span>
//                     </div>
//                 </div>
//             </CardContent>
//         </div>
//     )
// }

// export default RidePage