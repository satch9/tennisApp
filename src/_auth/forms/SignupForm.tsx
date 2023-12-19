import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast"


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";

import { useCreatePlayerAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { usePlayerContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast()
  const { checkAuthPlayer, isLoading: isPlayerLoading } = usePlayerContext();
  const navigate = useNavigate()

  const {
    mutateAsync: createPlayerAccount,
    isPending: isCreatingAccount
  } = useCreatePlayerAccount()

  const {
    mutateAsync: signInAccount,
    isPending: isSigningIn
  } = useSignInAccount()


  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      firstname: "",
      lastname: "",
      gender: "F",
      username: "",
      dateOfBirth: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log("signup values", values);
    // create new user
    const newUser = await createPlayerAccount(values);

    console.log("newUser Signupform", newUser);
    if (!newUser) {
      return toast({
        title: "Votre inscription a échoué. Merci d'essayer à nouveau"
      })
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if (!session) {
      return toast({
        title: "Echec de connexion. Merci d'essayer à nouveau"
      })
    }

    const isLoggedIn = await checkAuthPlayer();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      return toast({
        title: "Votre inscription a échoué. Merci d'essayer à nouveau"
      })
    }

  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img
          src="../../../public/assets/images/tennis-ball.svg"
          alt="logo"
          width={32}
          height={32}
        />
        <h2 className="h3-bold md:h2-bold pt-2 sm:pt-8">Tennis entre amis</h2>
        <h2 className="base-medium pt-2 sm:pt-8">Créer un nouveau compte</h2>
        <p className="text-light-3 pt-2 small-medium md:base-regular">
          Pour commencer, entre les détails
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexe</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="shad-input w-[60px]">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="F">F</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de naissance</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="format JJ/MM/AAAA"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Chargement...
              </div>
            ) : (
              "Soumettre"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Déjà un compte ?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
