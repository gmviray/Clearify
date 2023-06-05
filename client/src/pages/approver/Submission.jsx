// Icons
import { FaLink } from "react-icons/fa";
import { MdInsertComment } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";

// Util
import moment from "moment";

export default ({ item, user }) => (
    <div className="flex gap-10">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <h3 className="font-bold text-accent flex items-center gap-2">
                    <FaLink className="font-normal text-sm" /> Link
                </h3>
                <a
                    className="link link-primary"
                    href={item.link}
                    target="_blank"
                >
                    View submission
                </a>
            </div>
            <div className="flex items-center gap-4">
                <h3 className="font-bold text-accent flex items-center gap-2">
                    <BsCalendarDateFill className="text-sm" />
                    Date Submitted
                </h3>
                <p>{moment(item.date).format("MMMM D, YYYY")}</p>
            </div>
        </div>
        {item.remarks.length ? (
            <div className="flex flex-col">
                <h3 className="font-bold text-accent flex items-center gap-2 mb-2">
                    <MdInsertComment className="text-sm" />
                    Remarks
                </h3>
                {item.remarks.map((remark, index) => (
                    <div key={index} className="flex flex-col">
                        <p className="font-semibold">
                            {remark.remarkBy
                                ? `${remark.remarkBy.firstName} ${remark.remarkBy.lastName}`
                                : `${user.firstName} ${user.lastName}`}
                        </p>
                        <p className="text-sm mb-1 flex items-center gap-2">
                            <BsCalendarDateFill className="text-xs" />
                            {moment(remark.date).format("MMMM D, YYYY")}
                        </p>
                        <p className="max-w-3xl">{remark.remark}</p>
                        {item.remarks.length > 1 ? (
                            index < item.remarks.length - 1 ? (
                                <div className="divider"></div>
                            ) : undefined
                        ) : undefined}
                    </div>
                ))}
            </div>
        ) : undefined}
    </div>
);
