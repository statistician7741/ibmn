import Link from "next/link";

export default ({href, children}) => <Link href={href}><a className='reset-a'>{children}</a></Link>