import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { IUser } from "../../contexts/UserContext";
import trad from "../../lang/traduction";

function UserCard({ user, avatar }: { user: IUser; avatar: string }) {
  // GET LANG FROM CONTEXT
  const { lang } = useContext(AppContext);

  return (
    <div className="w-full rounded-md bg-myWhite shadow-lg md:w-1/2">
      <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-myWhite text-center">
        <div className="flex flex-1 flex-col p-8">
          {user.avatar ? (
            <img
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-cover"
              src={user.avatar}
              alt=""
            />
          ) : (
            user?.user_name && (
              <div className="mx-auto flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                <p className="text-center text-6xl text-myWhite">
                  {user?.user_name[0].toUpperCase()}
                </p>
              </div>
            )
          )}
          <h3 className="mt-2 font-bold text-primary">{user.user_name}</h3>
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">{trad[lang].user.location}</dt>
            <dd className="">
              <span className="rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-primary">
                {user.city}, {user.country}
              </span>
            </dd>
            <dt className="sr-only">{trad[lang].user.catchline}</dt>
            <dd className="mt-3 text-sm italic text-gray-600">
              "{user.catchline}"
            </dd>

            <dt className="sr-only">{trad[lang].user.introduction}</dt>
            <dd className="mt-3 text-sm text-gray-500">{user.introduction}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
