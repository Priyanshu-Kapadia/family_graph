/* eslint-disable prettier/prettier */
import { useCallback, useState, useEffect } from 'react'
import { Handle, Position } from 'reactflow'

const handleStyle = { left: 10 }

export function TextUpdaterNode({ data }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [savedTitle, setSavedTitle] = useState('');
    const [savedDescription, setSavedDescription] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(null);
    const [mode, setMode] = useState('view'); // 'view' or 'edit'
    const [connectedLabel, setConnectedLabel] = useState('');
    const toggleEditMode = () => {
        setMode((prevMode) => (prevMode === 'view' ? 'edit' : 'view'));
    }
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];

        if (selectedImage) {
            const reader = new FileReader();

            reader.onload = () => {
                setImage(reader.result);
            };

            reader.readAsDataURL(selectedImage);
        }
    };
    const onSave = () => {
        setSavedTitle(title);
        setSavedDescription(description);
        setIsSaved(true);
        setIsEditing(false);
    };
    const NodeLabel = ({ label }) => (
        <div className="relation-label absolute text-center">
            {label}
        </div>
    );
    const onDoubleClick = () => {
        setIsEditing(true);
    };
    const onConnect = (params) => {
        // Extract the label or information you want to display from the connected nodes
        const connectedNodesLabel = `${params.sourceHandle} to ${params.targetHandle}`;
        setConnectedLabel(connectedNodesLabel);
    };

    return (
        <>
            <Handle type="target" position={Position.Top} />
            {/* <div className='text-updater-node' style={{ display: "flex", justifyContent: "center", padding: "10px", flexFlow: "column", border: "1px solid #000", borderRadius: "10px" }}>
                <label htmlFor="text">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`nodrag ${isEditing ? 'editing' : ''}`}
                    onDoubleClick={onDoubleClick}
                />
                <label htmlFor="text">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`nodrag ${isEditing ? 'editing' : ''}`}
                    onDoubleClick={onDoubleClick}
                />
                {isEditing && (
                    <button onClick={onSave}>
                        Save
                    </button>
                )}
            </div> */}
            {/* <div style={{ display: showContent ? 'block' : 'none' }}>
                Display content here, you can customize this part based on your needs
                <p>Title: {title}</p>
                <p>Description: {description}</p>
            </div> */}
            {/* <div className="flex h-screen items-center justify-center bg-gray-100">

                <div className="max-h-screen max-w-md rounded-lg bg-white p-8 shadow-md">
                    <div className="flex items-center justify-center">
                        <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-black">
                            <img src="profile-picture.jpg" alt="Profile Picture" className="h-full w-full object-cover" />
                        </div>
                    </div>

                    <div className="mt-4 flex">
                        <div className="mr-2 w-1/2">
                            <label htmlFor="first-name" className="block text-sm text-gray-600">First Name</label>
                            <input type="text" id="first-name" name="first-name" className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none" />
                        </div>

                        <div className="ml-2 w-1/2">
                            <label htmlFor="last-name" className="block text-sm text-gray-600">Last Name</label>
                            <input type="text" id="last-name" name="last-name" className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="bio" className="block text-sm text-gray-600">Bio</label>
                        <textarea id="bio" name="bio" rows="4" className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"></textarea>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="relation" className="block text-sm text-gray-600">Relation</label>
                        <input type="text" id="relation" name="relation" className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none" />
                    </div>
                </div>
            </div> */}
            <div className="flex h-screen items-center justify-center border border-black bg-gray-100">

                <div className="nodrag relative max-h-screen max-w-md rounded-lg bg-white p-8 shadow-md">

                    <div className="absolute right-2 top-2">
                        <button className="mr-2 rounded-full bg-blue-500 p-2 text-white" onClick={toggleEditMode}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M20 6a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h3m2-3h4a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                            </svg>
                        </button>

                        <button className="rounded-full bg-red-500 p-2 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="image-upload" className="h-24 w-24 cursor-pointer overflow-hidden rounded-full border-4 border-black">
                            {image ? (
                                <img src={image} alt="Profile Picture" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="none" /* viewBox="0 0 24 24" */ stroke="currentColor"
                                        className="text-black-400 h-12 w-12">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"></path>
                                    </svg>
                                </div>
                            )}
                            {mode === 'edit' && <input type="file" id="image-upload" className="hidden" onChange={handleImageChange} />}
                        </label>
                    </div>
                    <div className="mt-4 flex">
                        <div className="mr-2 w-1/2">
                            <label htmlFor="first-name" className="block text-sm text-gray-600">First Name</label>
                            <input type="text" id="first-name" name="first-name" className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none" />
                        </div>

                        <div className="ml-2 w-1/2">
                            <label htmlFor="last-name" className="block text-sm text-gray-600">Last Name</label>
                            <input type="text" id="last-name" name="last-name" className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="bio" className="block text-sm text-gray-600">Bio</label>
                        <textarea id="bio" name="bio" rows="4" className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"></textarea>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="relation" className="block text-sm text-gray-600">Relation</label>
                        <input type="text" id="relation" name="relation" className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none" />
                    </div>
                    {mode === 'edit' && (
                        <div className="mt-4">
                            <button className="rounded-full bg-blue-500 p-2 text-white" onClick={toggleEditMode}>
                                Save
                            </button>
                        </div>
                    )}

                </div>
            </div>
            <NodeLabel label={connectedLabel} />
            <Handle type="source" position={Position.Bottom} id="a" onConnect={onConnect} />
            <Handle type="source" position={Position.Bottom} id="a" />
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={handleStyle}
            />
        </>
    )
}
