package com.cometchat.calls.utils;

import android.util.Log;

/**
 * Logging utility for CometChat calls module.
 */
public class CometChatLogger {
    // Log level constants
    public static final int VERBOSE = Log.VERBOSE;
    public static final int DEBUG = Log.DEBUG;
    public static final int INFO = Log.INFO;
    public static final int WARN = Log.WARN;
    public static final int ERROR = Log.ERROR;

    // Default log level
    private static int logLevel = INFO;

    /**
     * Set the global logging level for CometChat logger
     * @param level Log level to use (use constants from this class)
     */
    public static void setLogLevel(int level) {
        logLevel = level;
    }

    /**
     * Log a debug message
     * @param tag Log tag
     * @param message Message to log
     */
    public static void d(String tag, String message) {
        if (logLevel <= DEBUG) {
            Log.d(tag, message);
        }
    }

    /**
     * Log an info message
     * @param tag Log tag
     * @param message Message to log
     */
    public static void i(String tag, String message) {
        if (logLevel <= INFO) {
            Log.i(tag, message);
        }
    }

    /**
     * Log a warning message
     * @param tag Log tag
     * @param message Message to log
     */
    public static void w(String tag, String message) {
        if (logLevel <= WARN) {
            Log.w(tag, message);
        }
    }

    /**
     * Log an error message
     * @param tag Log tag
     * @param message Message to log
     */
    public static void e(String tag, String message) {
        if (logLevel <= ERROR) {
            Log.e(tag, message);
        }
    }

    /**
     * Log an error message with an exception
     * @param throwable Exception to log
     * @param tag Log tag
     * @param message Message to log
     */
    public static void e(Throwable throwable, String tag, String message) {
        if (logLevel <= ERROR) {
            Log.e(tag, message, throwable);
        }
    }

    public static void v(String tag, String message) {
        if (logLevel <= VERBOSE) {
            Log.v(tag, message);
        }
    }
}