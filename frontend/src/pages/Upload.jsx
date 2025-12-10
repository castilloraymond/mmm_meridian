import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Loader2, ArrowRight } from 'lucide-react';
import { uploadFile } from '../api';
import { cn } from '../lib/utils';

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        try {
            const result = await uploadFile(file);
            navigate('/dashboard', { state: { result } });
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-xl">
                <h2 className="text-3xl font-bold mb-2 text-center">Upload Your Data</h2>
                <p className="text-gray-400 text-center mb-8">
                    Upload your marketing spend CSV to generate insights.
                </p>

                <div
                    className={cn(
                        "border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer",
                        isDragging
                            ? "border-indigo-500 bg-indigo-500/10"
                            : "border-gray-700 hover:border-gray-600 bg-gray-800/50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload').click()}
                >
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".csv"
                        onChange={handleFileChange}
                    />

                    {file ? (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 text-indigo-400">
                                <FileText size={32} />
                            </div>
                            <p className="text-lg font-medium text-white mb-1">{file.name}</p>
                            <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                            <button
                                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                className="mt-4 text-sm text-red-400 hover:text-red-300"
                            >
                                Remove file
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                <Upload size={32} />
                            </div>
                            <p className="text-lg font-medium text-white mb-2">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-gray-500">CSV files only (max 10MB)</p>
                        </>
                    )}
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleUpload}
                        disabled={!file || isUploading}
                        className={cn(
                            "flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all",
                            !file || isUploading
                                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:scale-105"
                        )}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Processing...
                            </>
                        ) : (
                            <>
                                Generate Insights
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
