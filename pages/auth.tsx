import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Head from "next/head";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant == 'login' ? 'register' : 'login')
  }, [])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles'
      })
    } catch (error) {
      // console.log(error);
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email, name, password
      })
      login();
    } catch (error) {
      // console.log(error);
    }
  }, [email, name, password, login])

  return (
    <>
      <Head>
        <title>Netflix Clone</title>
        <meta name="google-site-verification" content="phtHwikeVzIrMdg5D5NBaHgbOGZzEnnzUldKWgTNw_g" />
        <meta property="og:NetflixClone" content="Netflix Clone" key="Netflix Clone" />
      </Head>
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full md:bg-opacity-50">
          <nav className="px-12 py-5">
            <img src="/images/logo.png" alt="Logo" className="h-12" />
            <div className="flex justify-center">
              <div className="bg-black/70 px-0 md:px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                <h2 className="text-white text-4xl mb-8 font-semibold">
                  {variant == 'login' ? 'Sign in' : 'Join the party'}
                </h2>
                <div className="flex flex-col gap-4">
                  {variant == 'register' &&
                    <Input label="User Name" onChange={(event: any) => setName(event.target.value)} id="name" type="text" value={name} />
                  }

                  <Input label="Email" onChange={(event: any) => setEmail(event.target.value)} id="email" type="email" value={email} />

                  <Input label="Password" onChange={(event: any) => setPassword(event.target.value)} id="password" type="password" value={password} />
                </div>

                <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700" onClick={variant == 'login' ? login : register}>
                  {variant == 'login' ? `Login` : `Register`}
                </button>

                <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition" onClick={() => {
                    signIn('google', {
                      callbackUrl: '/profiles'
                    })
                  }}>
                    <FcGoogle size={30} />
                  </div>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition" onClick={() => {
                    signIn('github', {
                      callbackUrl: '/profiles'
                    })
                  }}>
                    <FaGithub size={30} />
                  </div>
                </div>

                {variant == 'login' ?
                  <p className="text-neutral-500 mt-12">
                    First time using Netflix?
                    <span onClick={toggleVariant} className="text-white hover:underline ml-1 cursor-pointer" >Create Account</span>
                  </p>
                  :
                  <p className="text-neutral-500 mt-12">
                    Already a member?
                    <span onClick={toggleVariant} className="text-white hover:underline ml-1 cursor-pointer">Sign in</span>
                  </p>
                }

              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Auth;