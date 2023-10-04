package com.iwamobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Base64;

public class EncryptionModule extends ReactContextBaseJavaModule {
    @Override
    public String getName() {
        return "Encryptor";  // Name of the Native Modules.
    }

    String CIPHER_PASSWORD_KEY = "password";

    public static SecretKeySpec createKey(String chave) {
        try {
            byte[] charac = chave.getBytes(StandardCharsets.UTF_8);
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            charac = md.digest(charac);
            charac = Arrays.copyOf(charac, 16);
            SecretKeyFactory factory = SecretKeyFactory.getInstance("DES");
            SecretKey key = factory.generateSecret(new DESKeySpec(charac));
            return new SecretKeySpec(key.getEncoded(), "DES");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * @param plainText Text to be encrypted(from JS layer)
     */
    @ReactMethod
    public void encrypt(String plainText, Promise promise) {
        try {
            SecretKeySpec secretKeySpec = createKey(KEY);
            Cipher cipher = Cipher.getInstance("DES");
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
            byte[] utf8 = plainText.getBytes(StandardCharsets.UTF_8);
            byte[] enc = cipher.doFinal(utf8);
            promise.resolve(java.util.Base64.getEncoder().encodeToString(enc));
        } catch (Exception e) {
            promise.reject("ENCRYPTION_FAILED", "Encryption Failed");
        }
    }

    /**
     * @param encryptedText Text to be decrypted(from JS layer)
     */
    @ReactMethod
    public void decrypt(String encryptedText, Promise promise) {
        try {
            SecretKeySpec secretKeySpec = createKey(KEY);
            Cipher cipher = Cipher.getInstance("DES");
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
            byte[] dec = Base64.getDecoder().decode(encryptedText.getBytes());
            byte[] utf8 = cipher.doFinal(dec);
            promise.resolve(new String(utf8, StandardCharsets.UTF_8));
        } catch (Exception e) {
            promise.reject("DECRYPTION_FAILED", "Decryption Failed");
        }
    }

}