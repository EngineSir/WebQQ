package webqq.entity;

public class UserSession
{
	private String sessionId;
	private String friendId;
	public String getSessionId()
	{
		return sessionId;
	}
	public void setSessionId(String sessionId)
	{
		this.sessionId = sessionId;
	}
	public String getFriendId()
	{
		return friendId;
	}
	public void setFriendId(String friendId)
	{
		this.friendId = friendId;
	}
	@Override
	public String toString()
	{
		return "userSession [sessionId=" + sessionId + ", friendId=" + friendId + "]";
	}
	
}
