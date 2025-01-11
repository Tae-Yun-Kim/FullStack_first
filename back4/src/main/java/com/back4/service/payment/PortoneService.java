package com.back4.service.payment;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ParseException;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PortoneService {

    @Value("${portone.api-key}")
    private String apiKey;

    @Value("${portone.api-secret}")
    private String apiSecret;

    public String getAccessToken() throws IOException {
        String url = "https://api.portone.io/users/getToken";
        HttpPost post = new HttpPost(url);
        post.setHeader("Content-Type", "application/json");

        StringEntity entity = new StringEntity(new Gson().toJson(Map.of(
                "imp_key", apiKey,
                "imp_secret", apiSecret
        )));
        post.setEntity(entity);

        try (CloseableHttpClient client = HttpClients.createDefault();
             CloseableHttpResponse response = client.execute(post)) {
            String responseBody = EntityUtils.toString(response.getEntity());
            JsonObject jsonResponse = JsonParser.parseString(responseBody).getAsJsonObject();
            return jsonResponse.getAsJsonObject("response").get("access_token").getAsString();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public void validatePayment(String impUid, int amount, String token) throws IOException {
        String url = "https://api.portone.io/payments/" + impUid;

        HttpGet get = new HttpGet(url);
        get.setHeader("Authorization", token);

        try (CloseableHttpClient client = HttpClients.createDefault();
             CloseableHttpResponse response = client.execute(get)) {
            String responseBody = EntityUtils.toString(response.getEntity());
            JsonObject jsonResponse = JsonParser.parseString(responseBody).getAsJsonObject();
            JsonObject paymentInfo = jsonResponse.getAsJsonObject("response");

            if (paymentInfo.get("amount").getAsInt() != amount) {
                throw new IllegalArgumentException("결제 금액이 일치하지 않습니다.");
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
