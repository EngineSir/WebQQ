package webqq.entity;

public class UserFriends
{
	private String friendId;
	private String friendName;
	public String getFriendId()
	{
		return friendId;
	}
	public void setFriendId(String friendId)
	{
		this.friendId = friendId;
	}
	public String getFriendName()
	{
		return friendName;
	}
	public void setFriendName(String friendName)
	{
		this.friendName = friendName;
	}
	@Override
	public String toString()
	{
		return "userFriends [friendId=" + friendId + ", friendName=" + friendName + "]";
	}
	
}
