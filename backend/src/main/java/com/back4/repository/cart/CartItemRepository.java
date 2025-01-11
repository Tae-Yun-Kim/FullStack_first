package com.back4.repository.cart;

import com.back4.domain.cart.CartItem;
import com.back4.domain.mealkit.MealkitProduct;
import com.back4.dto.cart.CartItemListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query("select " +
            " new com.back4.dto.cart.CartItemListDTO(ci.ciid, ci.quantity, m.mid, m.mname, m.price, " +
            " (case when mi.fileName is not null then mi.fileName else 'default.jpg' end)) " +
            " from " +
            " CartItem ci inner join Cart mc on ci.cart = mc " +
            " left join Mealkit m on ci.mealkit = m " +
            " left join m.imageList mi " +
            " where mc.owner.email = :email and (mi.ord = 0 or mi.ord is null) " +
            " order by ci desc ")
    public List<CartItemListDTO> getItemsOfCartDTOByEmail(@Param("email") String email);

    @Query("SELECT mp FROM MealkitProduct mp JOIN FETCH mp.product WHERE mp.mpid = :mpid")
    Optional<MealkitProduct> findWithProductById(@Param("mpid") Long mpid);



    @Query(" select " +
    " ci from CartItem ci inner join Cart c on ci.cart = c " +
    " where c.owner.email = :email and ci.mealkit.mid = :mid")
    Optional<CartItem> getItemOfMid(@Param("email") String email, @Param("mid") Long mid);

    @Query(" select c.cid from Cart c inner join CartItem ci on ci.cart = c " +
    " where ci.ciid = :ciid")
    public Long getCartFromItem(@Param("ciid") Long ciid);

    @Query(" select new com.back4.dto.cart.CartItemListDTO(ci.ciid, ci.quantity, m.mid, m.mname, m.price, mi.fileName)" +
    " from CartItem ci inner join Cart mc on ci.cart = mc " +
    " left join Mealkit m on ci.mealkit = m " +
    " left join m.imageList mi " +
    " where " +
    " mc.cid = :cid and mi.ord = 0 order by ci desc ")
    public List<CartItemListDTO> getItemsOfCartDTOByCart(@Param("cid") Long cid);
}
