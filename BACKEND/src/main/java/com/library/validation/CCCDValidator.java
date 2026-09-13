package com.library.validation;

import java.util.Set;
import java.util.regex.Pattern;

public final class CCCDValidator {

    private static final Pattern CCCD_PATTERN = Pattern.compile("^\\d{12}$");

    
    private static final Set<String> VALID_PROVINCE_CODES = Set.of(
            "001","002","004","006","008","010","011","012","014","015",
            "017","019","020","022","024","025","026","027","030","031",
            "033","034","035","036","037","038","040","042","044","045",
            "046","048","049","051","052","054","056","058","060","062",
            "064","066","067","068","070","072","074","075","077","079",
            "080","082","083","084","086","087","089","091","093","094",
            "095","096"
    );

    private CCCDValidator() {}

    public static boolean isValid(String cccd) {
        if (cccd == null || !CCCD_PATTERN.matcher(cccd).matches()) {
            return false;
        }
        return VALID_PROVINCE_CODES.contains(cccd.substring(0, 3));
    }
}
