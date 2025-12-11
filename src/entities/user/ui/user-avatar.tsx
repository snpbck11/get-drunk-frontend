import Image from "next/image";

interface IUserAvatarProps {
  imageUrl?: string;
  firstName: string;
  lastName: string;
}

export function UserAvatar({ imageUrl, firstName, lastName }: IUserAvatarProps) {
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  return (
    <div className="w-18 h-18 sm:w-30 sm:h-30 flex items-center justify-center bg-red-400 rounded-full overflow-hidden">
      {imageUrl ? (
        <Image
          className="w-full h-full object-cover"
          src={imageUrl}
          width={150}
          height={150}
          alt={`Фото профиля ${firstName} ${lastName}`}
        />
      ) : (
        <p className="text-3xl sm:text-6xl">{initials}</p>
      )}
    </div>
  );
}
