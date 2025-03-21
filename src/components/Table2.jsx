/* eslint-disable react/prop-types */
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import userImage from "/assets/userImg.jpg";
import { dateFormat, shortUppercaseId } from "./notifications/Format";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-xs text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = ({ data, i, users, OnEditFunction, onDeleteFunction }) => {
  return (
    <tr key={i}>
      {/* users  */}
      {users ? (
        <>
          <td className={Text}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
              <img
                src={data.image || userImage}
                alt="user avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </td>
          <td className={Text}>
            {data?._id ? shortUppercaseId(data._id) : ""}
          </td>
          <td className={Text}>{dateFormat(data?.createdAt)}</td>
          <td className={Text}>{data?.fullName}</td>
          <td className={Text}>{data?.email}</td>
          <td className={Text}>{data?.isAdmin ? "Admin" : "User"}</td>
          <td className={`${Text} flex justify-end gap-2`}>
            {!data?.isAdmin && (
              <button
                onClick={() => onDeleteFunction(data?._id)}
                className="bg-subMain text-white rounded flex items-center justify-center flex-row size-8"
              >
                <MdDelete className="text-white size-5" />
              </button>
            )}
          </td>
        </>
      ) : (
        <>
          {/* categories  */}
          <td className={Text}>{data?._id && shortUppercaseId(data._id)}</td>
          <td className={Text}>{dateFormat(data?.createdAt)}</td>
          <td className={Text}>{data?.title}</td>
          <td className={`${Text} flex justify-end gap-2`}>
            <button
              onClick={() => OnEditFunction(data)}
              className="group border border-border bg-dry flex items-center gap-2 text-border rounded py-1 px-2 hover:bg-green-500 hover:text-white transition"
            >
              Edit{" "}
              <FaEdit className="text-green-500 group-hover:text-white transition" />
            </button>
            <button
              onClick={() => onDeleteFunction(data?._id)}
              className="bg-subMain text-white rounded flex items-center justify-center size-8"
            >
              <MdDelete className="text-white size-5" />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

const Table2 = ({ data, users, OnEditFunction, onDeleteFunction }) => {
  return (
    <div className="relative w-full">
      <div className="max-h-[400px] overflow-y-auto hidden-scrollbar">
        <table className="min-w-max w-full table-auto border border-border divide-y divide-border">
          <thead>
            <tr className="bg-dryGray">
              {users ? (
                <>
                  <th scope="col" className={Head}>
                    Image
                  </th>
                  <th scope="col" className={Head}>
                    Id
                  </th>
                  <th scope="col" className={Head}>
                    Date
                  </th>
                  <th scope="col" className={Head}>
                    Full Name
                  </th>
                  <th scope="col" className={Head}>
                    Email
                  </th>
                  <th scope="col" className={Head}>
                    Role
                  </th>
                </>
              ) : (
                <>
                  <th scope="col" className={Head}>
                    Id
                  </th>
                  <th scope="col" className={Head}>
                    Date
                  </th>
                  <th scope="col" className={Head}>
                    Name
                  </th>
                </>
              )}
              <th className={`${Head} text-end`}>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-main divide-y divide-gray-800">
            {data.map((data, i) => (
              <Rows
                key={i}
                data={data}
                users={users}
                OnEditFunction={OnEditFunction}
                onDeleteFunction={onDeleteFunction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table2;
