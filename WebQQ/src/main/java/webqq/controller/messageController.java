package webqq.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.stereotype.Controller;

import webqq.dao.userDao;
import webqq.paramter.GetHttpSessionConfigurator;
@ServerEndpoint(value="/chat/message.do",configurator=GetHttpSessionConfigurator.class)

public class messageController
{
	private static CopyOnWriteArraySet<messageController> webSocketSet = new CopyOnWriteArraySet<messageController>();
	private Session session;
	private static Map<String,Session> sessUserId=new HashMap<String,Session>();

	@OnOpen
	public void onOpen(Session session,EndpointConfig config){
		this.session=session;
		webSocketSet.add(this);
		HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
		sessUserId.put((String)httpSession.getAttribute("userId"), session);
		
	}
	@OnClose
	public void onClose(){
		webSocketSet.remove(this);
		System.out.println("关闭");
	}
	@OnMessage
	public void onMessage(String message){
		
		String friendId=message.substring(0, message.indexOf("%"));
		String usermsg=message.substring(message.indexOf("%")+1);
		System.out.println(message);
		Session s=sessUserId.get(friendId);
		System.out.println(usermsg);
					try
					{
						s.getBasicRemote().sendText(usermsg);
					} catch (IOException e)
					{
						e.printStackTrace();
					}
		
	}
	@OnError
	public void onError(Session session,Throwable error){
		
	}
}
