import { FC} from "react";
import { IData} from "../../interfaces/interfaces";
import Image from "../Image/Image";
import Likes from "../Likes/Likes";
import Description from "../Description/Description";


interface IProps {
  data: IData ;
}

export const ProfileImages: FC<IProps> = ({data}) => {

  const {photo} = data.data;

  return (
    <>
    </>
  );
};
