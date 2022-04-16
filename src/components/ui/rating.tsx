import { StarIcon } from "@heroicons/react/solid";

import { classNames } from "@lib/classnames";

interface RatingProps {
  rate: number;
  count: number;
  textSize?: string;
  stars?: number;
  withReviews?: boolean;
}

export function Rating({
  rate,
  count,
  textSize = "text-sm",
  stars = 5,
  withReviews = true,
}: RatingProps) {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <span className={`${textSize} font-semibold`}>{rate}</span>
        <ul className="flex justify-center ml-1 mt-0.5">
          {[...Array(stars).keys()].map((rating) => (
            <li key={rating}>
              <StarIcon
                className={classNames(
                  rating < 4 ? "text-yellow-400" : "text-gray-300",
                  "h-4 w-4"
                )}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </div>
      {withReviews && (
        <p className={`${textSize} font-semibold pl-1`}>({count})</p>
      )}
    </div>
  );
}
