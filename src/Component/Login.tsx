import PlayerImg from '../assets/playerIcon.svg'
import { LoginIcon, LogoIcon } from './Icons'
import { motion } from 'framer-motion';
const login = () => {
        const firstDivAnimation = {
          hidden: { x: -1200 },
          visible: { x: 0 },
        };
    const secondDivAnimation = {
        hidden: { x: 1200 }, 
        visible: { x: 0 },   
      };
      const handleLoginButtonClick = () => {
        window.location.href = 'http://localhost/api/auth/intra42';
      };
    return (
      <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden w-[90%]">
      <LogoIcon className='w-[12vh] h-[12vh] p-2'/>
            <div className='flex gap-8 items-center font-Stick rounded-xl h-[80vh] w-[60%] m-auto'>
                <motion.div
                className='flex-1'
                initial="hidden"
                animate="visible"
                variants={firstDivAnimation}
                transition={{ ease: "easeOut", duration: 2 }}

                >
                    <h1 className=' text-nberFriendsColor font-bold my-4 text-2xl sm:text-3xl md:text-4xl'>Play Pong game</h1>
                    <p className='text-white font-thin my-5 text-sm sm:text-md md:text-lg'>Welcome to the thrilling world of online ping pong,
                        where the virtual table comes alive with intense rallies and lightning-fast reflexes.
                        Engage in epic battles with players from around the globe.</p>
                    <button className='text-white bg-buttonLoginColor rounded-2xl p-2 w-35 text-lg flex gap-2 items-center' onClick={handleLoginButtonClick}><LoginIcon className='w-6 h-6' />Login</button>
          
                </motion.div>
                <motion.div
                className='flex-1 hidden md:block'
                initial="hidden"
                animate="visible"
                variants={secondDivAnimation}
                transition={{ ease: "easeOut", duration: 2 }}
                >
                    <img src={PlayerImg} alt="Pong" className=' md:w-[350px] md:h-[275px] 2xl:w-[450px] 2xl:h-[375px]  ' />

                </motion.div>
               
            </div>
            </div>
    );
}


export default login;