import { StarIcon } from "@heroicons/react/solid";

import { classNames } from "../../utils/classnames";

interface RatingProps {
  rate: number;
  count: number;
  textSize?: string;
}

export function Rating({ rate, count, textSize = "text-sm" }: RatingProps) {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <span className={`${textSize} font-semibold pl-2`}>{rate}</span>
        <ul className="flex justify-center ml-1 mt-0.5">
          {[0, 1, 2, 3, 4].map((rating) => (
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
      <p className={`${textSize} font-semibold pl-1`}>({count})</p>
    </div>
  );
}
