package webqq.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import org.apache.commons.codec.binary.Base64;

public class Uitl
{
	public static String getMd5(String msg) throws NoSuchAlgorithmException{
		MessageDigest md = 
				MessageDigest.getInstance("MD5");
			byte[] input = msg.getBytes();
			byte[] output = md.digest(input);//将字节信息处理
			//将md5处理的output结果转成字符串
			String result = 
				Base64.encodeBase64String(output);
			return result;
	}
	public static String createId(){
		UUID uuid=UUID.randomUUID();
		String id=uuid.toString();
		return id.replace("-","");
	}
}
