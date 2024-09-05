// import { buttonVariants } from '@/components/ui/button';
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from '@/components/ui/card';
// import { teamList } from '@/libs/data';
// import { SociaNetworkslProps, TeamProps } from '@/libs/type';
// import { Facebook, Instagram, Linkedin } from 'lucide-react';

// export const Team = () => {
//     const socialIcon = (iconName: string) => {
//         switch (iconName) {
//             case 'Linkedin':
//                 return <Linkedin size="20" />;

//             case 'Facebook':
//                 return <Facebook size="20" />;

//             case 'Instagram':
//                 return <Instagram size="20" />;
//         }
//     };

//     return (
//         <section id="team" className="container py-24 sm:py-32">
//             <h1 className="text-3xl md:text-4xl font-bold text-center mb-20">
//                 <span className="text-primary bg-clip-text">Meet Our </span>
//                 Team
//             </h1>

//             <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 gap-y-10">
//                 {teamList.map(
//                     ({
//                         imageUrl,
//                         name,
//                         position,
//                         socialNetworks,
//                     }: TeamProps) => (
//                         <Card
//                             key={name}
//                             className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
//                         >
//                             <CardHeader className="mt-8 flex justify-center items-center pb-2">
//                                 <div>
//                                     <img
//                                         src={imageUrl}
//                                         alt={`${name} ${position}`}
//                                         className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
//                                     />
//                                 </div>
//                                 <CardTitle className="text-center">
//                                     {name}
//                                 </CardTitle>
//                                 <CardDescription className="text-primary">
//                                     {position}
//                                 </CardDescription>
//                             </CardHeader>

//                             <CardContent className="text-center pb-2">
//                                 <p>
//                                     Lorem ipsum dolor sit amet, consectetur
//                                     adipisicing elit.
//                                 </p>
//                             </CardContent>

//                             <CardFooter>
//                                 {socialNetworks.map(
//                                     ({ name, url }: SociaNetworkslProps) => (
//                                         <div key={name}>
//                                             <a
//                                                 rel="noreferrer noopener"
//                                                 href={url}
//                                                 target="_blank"
//                                                 className={buttonVariants({
//                                                     variant: 'ghost',
//                                                     size: 'sm',
//                                                 })}
//                                             >
//                                                 <span className="sr-only">
//                                                     {name} icon
//                                                 </span>
//                                                 {socialIcon(name)}
//                                             </a>
//                                         </div>
//                                     ),
//                                 )}
//                             </CardFooter>
//                         </Card>
//                     ),
//                 )}
//             </div>
//         </section>
//     );
// };
