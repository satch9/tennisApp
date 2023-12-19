export type IContextType = {
  player: IPlayer;
  isLoading: boolean;
  setPlayer: React.Dispatch<React.SetStateAction<IPlayer>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthPlayer: () => Promise<boolean>;
}

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IPlayer = {
  id: string;
  firstname: string;
  lastname: string;
  gender: string;
  username: string;
  dateOfBirth: string;
  email: string;
  password: string;
};

export type INewPlayer = {
  firstname: string;
  lastname: string;
  gender: string;
  username: string;
  dateOfBirth: string;
  email: string;
  password: string;
};