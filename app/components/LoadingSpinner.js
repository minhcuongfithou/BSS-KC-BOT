import '@/app/styles/loading.css';

export default function LoadingSpinner() {
    return (
        <div className="loader-container">
            <div className="dot-loader">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

    );
}
