import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import { useAppContext } from "../context/appContext";

const Favorites = () => {
	const {favoriteMovies} = useAppContext();
	return favoriteMovies.length > 0 ? (
		<div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
			<BlurCircle top="150px" left="0px" />
			<BlurCircle bottom="50px" right="50px" />
			<h1 className="text-lg font-medium my-4">Favorites</h1>
			<div className="flex flex-wrap max-sm:justify-center gap-8">
				{favoriteMovies.map((movie) => {
					return <MovieCard movie={movie} key={movie.id} />;
				})}
			</div>
		</div>
	) : (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-3xl font-bold text-center">
				No Movies available
			</h1>
		</div>
	);
};

export default Favorites;
