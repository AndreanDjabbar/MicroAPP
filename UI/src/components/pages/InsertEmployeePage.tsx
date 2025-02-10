import { useState } from 'react';
import insertEmployeeService from '../../services/insertEmployeeService';
import userData from '../layouts/userData';

const InsertEmployeePage = () => {
    const [formData, setFormData] = useState<userData>({
        username: '',
        age: 0,
        isMarried: false,
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await insertEmployeeService(formData);

        if (response === 'success') {
            console.log('Data inserted successfully!');
        } else {
            console.error('Failed to insert data.');
        }
        alert(`Insert Data: ${response}`);
        window.location.reload();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'radio' ? value === 'true' : type === 'number' ? Number(value) : value,
        }));
    };

    return (
        <div className="w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">Insert Employee</h1>
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-300">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                        value={formData.age || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Is Married</label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                id="marriedYes"
                                name="isMarried"
                                value="true"
                                checked={formData.isMarried === true}
                                onChange={handleInputChange}
                                className="text-amber-400 focus:ring-amber-400"
                                required
                            />
                            <span className="ml-2 text-gray-300">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                id="marriedNo"
                                name="isMarried"
                                value="false"
                                checked={formData.isMarried === false}
                                onChange={handleInputChange}
                                className="text-amber-400 focus:ring-amber-400"
                            />
                            <span className="ml-2 text-gray-300">No</span>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors"
                >
                    Insert
                </button>
            </form>
        </div>
    );
};

export default InsertEmployeePage;