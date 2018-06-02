package webqq.entity;

public class User
{
	private String userId;
	private String ID;
	private String nickName;
	private String password;
	private String autograph;
	public String getUserId()
	{
		return userId;
	}
	public void setUserId(String userId)
	{
		this.userId = userId;
	}
	public String getID()
	{
		return ID;
	}
	public void setID(String iD)
	{
		ID = iD;
	}
	public String getNickName()
	{
		return nickName;
	}
	public void setNickName(String nickName)
	{
		this.nickName = nickName;
	}
	public String getPassword()
	{
		return password;
	}
	public void setPassword(String password)
	{
		this.password = password;
	}
	public String getAutograph()
	{
		return autograph;
	}
	public void setAutograph(String autograph)
	{
		this.autograph = autograph;
	}
	@Override
	public String toString()
	{
		return "user [userId=" + userId + ", ID=" + ID + ", nickName=" + nickName + ", password=" + password
		        + ", autograph=" + autograph + "]";
	}
	
}
