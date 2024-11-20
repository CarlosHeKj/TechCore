
import SkeletonCart from "./components/SkeletonCart";
export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
                <SkeletonCart isLoading/>
                <SkeletonCart isLoading/>
                <SkeletonCart isLoading/>
                <SkeletonCart isLoading/>
                <SkeletonCart isLoading/>
                <SkeletonCart isLoading/>
            </div>

        </div>

    );
}