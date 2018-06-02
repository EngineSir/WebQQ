package webqq.entity;

public class OnState
{
	private String userId;
	private String friendId;
	private int state;
	public String getUserId()
	{
		return userId;
	}
	public void setUserId(String userId)
	{
		this.userId = userId;
	}
	public String getFriendId()
	{
		return friendId;
	}
	public void setFriendId(String friendId)
	{
		this.friendId = friendId;
	}
	public int getState()
	{
		return state;
	}
	public void setState(int state)
	{
		this.state = state;
	}
	@Override
	public String toString()
	{
		return "onState [userId=" + userId + ", friendId=" + friendId + ", state=" + state + "]";
	}
	
}
