'use client';

import { deleteMessage } from '@/app/_backend/actions/delete-message'
import { editMessage } from '@/app/_backend/actions/edit-message'

import { XIcon } from '../../icons/xIcon'
import { EditIcon } from '../../icons/editIcon'


export default function MessageContainer(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>, HTMLDivElement
  > & {
    isCurrentUser: boolean,
    imgSrc: string,
    messageId: number,
    isFile: boolean
  }
): JSX.Element {

  const baseContainerStyle = "flex w-full items-center mb-4 ";
  const containerStyle = {
    currentUser: baseContainerStyle + "justify-end",
    userFriend: baseContainerStyle + "justify-start"
  };

  const baseMessageStyle = "flex px-4 py-2 rounded-lg items-center justify-center ";
  const messageStyle = {
    currentUser: baseMessageStyle + "bg-indigo-600 text-white",
    userFriend: baseMessageStyle + "bg-gray-200 text-gray-900"
  };


  var mainContent = [
    () => <img key={1}
      src={props.imgSrc}
      alt='Profile picture'
      referrerPolicy='no-referrer'
      className={`rounded-full w-6 h-6 ${props.isCurrentUser ? "ml-4" : "mr-4"}`}
    />,
    () => <div className={props.isCurrentUser ? messageStyle.currentUser : messageStyle.userFriend} key={2} >
      {props.children}
    </div>,
    () => !props.isFile && <form className={props.isCurrentUser ? "mr-4" : "ml-4"} key={3}
      action={async () => { await editMessage(props.messageId) }}
    >
      <EditIcon />
    </form>,
    () => !props.isFile && <form action={async () => { await deleteMessage(props.messageId) }} key={4} >
      <XIcon />
    </form>
  ];

  if(props.isCurrentUser)
    mainContent = mainContent.reverse();

  return <div className={props.isCurrentUser ? containerStyle.currentUser : containerStyle.userFriend}>
    {mainContent.map((Element, i) => <Element key={i} />)}
  </div>
}