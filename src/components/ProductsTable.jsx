import {
  Calendar,
  ChevronsUpDown,
  Edit,
  PencilLine,
  Phone,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { useUsers } from "../hooks/user-users";
import Modal from 'react-modal';
import { useState } from "react";
import { $axios } from "../https/api";

Modal.setAppElement('#root');

const ProductsTable = () => {
  const [search, setSearch] = useState('');
  const { users, setUsers } = useUsers();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleSearchUser = (event) => {
    const query = event.target.value.trim().toLowerCase();
    setSearch(query);

    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.phone.includes(query)
    );

    setUsers(filteredUsers);
  };


  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log(selectedUser)
    const updatedUsers = users.map(user =>
      user.id === selectedUser.id ? selectedUser : user
    );
    setUsers(updatedUsers);
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await $axios.delete(`/user/delete/${userToDelete.id}`,)
      const filteredUsers = users.filter(user => user.id !== userToDelete.id);
      setUsers(filteredUsers);
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="bg-[#0B1739] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 mb-8">
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
        className="bg-[#0B1739] rounded-lg p-6 max-w-md mx-auto mt-20 shadow-xl z-50 relative"
      >
        {selectedUser && (
          <>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={selectedUser.phone}
                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Subscription</label>
                  <input
                    type="text"
                    value={selectedUser.subsciption || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, subsciption: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-300 hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700">
                  Save Changes
                </button>
              </div>
            </form>
          </>
        )}
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
        className="bg-[#0B1739] rounded-lg p-6 max-w-md mx-auto mt-20 shadow-xl z-50 relative"
      >
        <div className="text-center">
          <Trash2 className="mx-auto text-red-400 mb-4" size={40} />
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Delete User</h2>
          <p className="text-gray-400 mb-6">Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.</p>
          <div className="flex justify-center space-x-4">
            <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2 text-gray-300 hover:text-white">
              Cancel
            </button>
            <button onClick={handleDeleteConfirm} className="px-6 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <div className="mb-4 flex items-center max-w-64 bg-gray-800 rounded-lg px-4 py-2">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearchUser}
          className="w-full bg-transparent text-white placeholder-gray-500 px-3 focus:outline-none"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <User />
                  <span>Name</span>
                  <ChevronsUpDown />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <Phone />
                  <span>Phone</span>
                  <ChevronsUpDown />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <PencilLine />
                  <span>Subsciption</span>
                  <ChevronsUpDown />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <Calendar />
                  <span>Created date</span>
                  <ChevronsUpDown />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-900 cursor-pointer transition-all">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                  {user.image_url && <img src={user.image_url} alt="Product img" className="size-10 rounded-full" />}
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.subsciption || "No Subscriptions"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 ">{user.created_at}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-6" onClick={() => { setSelectedUser(user); setIsEditModalOpen(true); }}>
                    <Edit size={18} />
                  </button>
                  <button className="text-red-400 hover:text-red-300" onClick={() => { setUserToDelete(user); setIsDeleteModalOpen(true); }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
